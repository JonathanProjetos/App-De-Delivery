const SaleProduct = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('saleProduct', {

    sale_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'sales',
        key: 'id',
      },
    },

    product_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'products',
        key: 'id',
      },
    },

    quantity: DataTypes.INTEGER,

  },{
    timestamps: false
  });

  saleProduct.associate = (models) => {
    saleProduct.belongsToMany(models.sales, {
      foreignKey: 'id',
      as: 'sales',
    });
  }

  saleProduct.associate = (models) => {
    saleProduct.belongsToMany(models.products, {
      foreignKey: 'id',
      as: 'products',
    });
  }

  return saleProduct;
};

module.exports = SaleProduct;