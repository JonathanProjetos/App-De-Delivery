const User = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    name: {
      allowNull:false,
      type: DataTypes.VARCHAR(255),
    },

    email: {
      allowNull:false,
      type: DataTypes.VARCHAR(255),
    },

    password: {
      allowNull:false,
      type: DataTypes.VARCHAR(255),
    },

    role: {
      allowNull:false,
      type: DataTypes.VARCHAR(255),
    },
  }, {
    timestamps: false
  });

  user.associate = (models) => {
    user.hasMany(models.sales, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return user;
};

module.exports = User;