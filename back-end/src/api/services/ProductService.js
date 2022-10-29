const { product } = require('../../database/models');

const ProductService = {

  getProducts: async () => {
    const products = await product.findAll();
    const result = products.map((user) => user.dataValues);
    return result;
  },
};

module.exports = ProductService;
