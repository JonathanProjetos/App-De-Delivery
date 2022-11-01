const Products = require('../services/ProductService');

const ProductsController = {

  getProducts: async (req, res) => {
    const result = await Products.getProducts();
    return res.status(200).json(result);
  },
};

module.exports = ProductsController;
