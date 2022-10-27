const Sale = (sequelize, DataTypes) => {
  const sale = sequelize.define('sale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },


    seller_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },

    total_price: {
      allowNull:false,
      type: DataTypes.STRING,
    },

    delivery_address: {
      allowNull:false,
      type: DataTypes.VARCHAR(100),
    },

    delivery_number: {
      allowNull:false,
      type: DataTypes.VARCHAR(50),
    },

    sale_date: {
      allowNull:false,
      type: DataTypes.DATE,
    },

    status: {
      allowNull: false,
      type: DataTypes.VARCHAR(50),
    }
  });

  sale.associate = (models) => {
    sale.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user',
    });

    sale.belongsTo(models.user, {
      foreignKey: 'seller_id',
      as: 'user',
    });

  };
  return sale;
};