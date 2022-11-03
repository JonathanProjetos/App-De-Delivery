const saleProducts = require('../services/SaleProductsServices');

const ProductsController = {

  addSaleProducts: async (req, res) => {
    const { body } = req;
    console.log(body);
    const result = await saleProducts.addSaleProducts(body);
    return res.status(201).json({ id: result });
  },
};

module.exports = ProductsController;