module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('sale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },

    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'seller_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },

    totalPrice: {
      allowNull:false,
      filed: 'total_price',
      type: DataTypes.DECIMAL(9, 2),
    },

    deliveryAddress: {
      allowNull:false,
      field: 'delivery_address',
      type: DataTypes.STRING,
    },

    deliveryNumber: {
      allowNull:false,
      field: 'delivery_number',
      type: DataTypes.STRING,
    },

    saleDate: {
      allowNull:false,
      field: 'sale_date',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    status: {
      allowNull: false,
      type: DataTypes.STRING,
    }

  },{
    underscored: true,
    timestamps: false
  });

  sale.associate = (models) => {
    sale.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user',
    });

    sale.belongsTo(models.user, {
      foreignKey: 'seller_id',
      as: 'seller',
    });

  };
  return sale;
};