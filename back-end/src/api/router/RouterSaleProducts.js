const express = require('express');

const RouterSaleProducts = express.Router();
const saleProductsController = require('../controllers/SaleProductsController');

RouterSaleProducts.post('/customer/sale', saleProductsController.addSaleProducts);

module.exports = RouterSaleProducts;
