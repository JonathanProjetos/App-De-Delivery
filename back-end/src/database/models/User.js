module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    name: {
      allowNull:false,
      type: DataTypes.STRING,
    },

    email: {
      allowNull:false,
      type: DataTypes.STRING,
    },

    password: {
      allowNull:false,
      type: DataTypes.STRING,
    },

    role: {
      allowNull:false,
      type: DataTypes.STRING,
    },
    
  }, {
    timestamps: false
  });

  user.associate = (models) => {
    user.hasMany(models.sale, {
      foreignKey: 'user_id',
      as: 'sale',
    });

    user.hasMany(models.sale, {
      foreignKey: 'seller_id',
      as: 'seller',
    });
  };

  return user;
};

