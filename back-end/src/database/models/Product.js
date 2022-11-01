module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {

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

    price: {
      allowNull:false,
      type: DataTypes.DECIMAL(4,2),
    },

    url_image: {
      allowNull:false,
      type: DataTypes.STRING,
    },

  },{
    underscored: true,
    timestamps: false
  });

  return product;
};
