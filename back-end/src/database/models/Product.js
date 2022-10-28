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
      type: DataTypes.STRING,
    },

    url_image: {
      allowNull:false,
      type: DataTypes.STRING,
    },

  },{
    timestamps: false
  });

  // product.associate = (models) => {
  //   product.hasMany(models.saleProduct, {
  //     foreignKey: 'id',
  //     as: 'saleProduct',
  //   });
  // };
  return product;
};
