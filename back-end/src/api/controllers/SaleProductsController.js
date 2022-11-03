const saleProducts = require('../services/SaleProductsServices');

const saleProductsController = {

  addSaleProducts: async (req, res) => {
    const { body } = req;    
    const result = await saleProducts.addSaleProducts(body, body.order);
    return res.status(201).json({ id: result });
  },
};

module.exports = saleProductsController;