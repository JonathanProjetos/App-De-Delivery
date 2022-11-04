const express = require('express');

const RouterSalesDetail = express.Router();
const ValidateToken = require('../middleware/ValidateToken');
const SalesDetailController = require('../controllers/SalesDetailController');
;

RouterSalesDetail.get('/customer/orders/:id',ValidateToken.loginToken, SalesDetailController.getSalesById);

module.exports = RouterSalesDetail;
