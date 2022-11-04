const express = require('express');
const ValidateToken = require('../middleware/ValidateToken');
const SalesDetailController = require('../controllers/SalesDetailController');

const RouterSalesDetail = express.Router();

RouterSalesDetail.get('/customer/orders/:id',
ValidateToken.loginToken, 
SalesDetailController.getSalesById);

module.exports = RouterSalesDetail;
