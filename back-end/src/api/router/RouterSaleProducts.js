const express = require('express');

const RouterSaleProducts = express.Router();
// const ValidateToken = require('../middleware/ValidateToken');
const saleProductsController = require('../controllers/SaleProductsController');

RouterSaleProducts.post('/customer/sale', saleProductsController.addSaleProducts);

module.exports = RouterSaleProducts;
