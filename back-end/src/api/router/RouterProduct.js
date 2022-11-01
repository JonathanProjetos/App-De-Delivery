const express = require('express');

const RouterProducts = express.Router();
const ProductsController = require('../controllers/ProductsController');

RouterProducts.get('/customer/products', ProductsController.getProducts);

module.exports = RouterProducts;
