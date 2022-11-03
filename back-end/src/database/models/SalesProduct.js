module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('saleProduct', {

    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'sale_id',
      references: {
        model: 'sale',
        key: 'id',
      },
    },

    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'product_id',
      references: {
        model: 'product',
        key: 'id',
      },
    },

    quantity: DataTypes.INTEGER,

  },{
    tableName: 'sales_products',
    underscored: true,
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
