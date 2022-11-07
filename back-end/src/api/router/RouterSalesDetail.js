const express = require('express');
const ValidateToken = require('../middleware/ValidateToken');
const SalesDetailController = require('../controllers/SalesDetailController');

const RouterSalesDetail = express.Router();

RouterSalesDetail.patch('/customer/orderStatus', 
SalesDetailController.updateStatus);

RouterSalesDetail.get('/customer/orders/:id',
ValidateToken.loginToken, 
SalesDetailController.getSalesById);

module.exports = RouterSalesDetail;
