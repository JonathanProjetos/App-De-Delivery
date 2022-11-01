const express = require('express');

const RouterProducts = express.Router();
const ProductsController = require('../controllers/ProductsController');
const SalesController = require('../controllers/SalesController');
const ValidateToken = require('../middleware/ValidateToken');

RouterProducts.get('/customer/products', ProductsController.getProducts);
RouterProducts.get('/customer/orders', ValidateToken.loginToken, SalesController.getSalesById);

module.exports = RouterProducts;
