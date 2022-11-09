const express = require('express');
const ValidateToken = require('../middleware/ValidateToken');
const SalesDetailController = require('../controllers/SalesDetailController');

const RouterSalesDetail = express.Router();

RouterSalesDetail.get('/seller/orders', 
ValidateToken.loginToken, SalesDetailController.getSalesAllSeller);

RouterSalesDetail.patch('/customer/orderStatus', 
SalesDetailController.updateStatus);

RouterSalesDetail.get('/customer/orders/:id',
ValidateToken.loginToken, 
SalesDetailController.getSalesById);

RouterSalesDetail.get('/seller/orders/:id',
ValidateToken.loginToken, 
SalesDetailController.getSalesbyIdSeller);

module.exports = RouterSalesDetail;
