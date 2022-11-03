module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('sales_product', {

    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'sale',
        key: 'id',
      },
    },

    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'product',
        key: 'id',
      },
    },

    quantity: DataTypes.INTEGER,

  },{
    timestamps: false
  });

  saleProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      through: saleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      as: 'sales',
    });
  }

  saleProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      through: saleProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      as: 'products',
    });
  }

  return saleProduct;
};
