const express = require('express');

const RouterSalesDetail = express.Router();

const SalesDetailController = require('../controllers/SalesDetailController');

RouterSalesDetail.get('/customer/orders/:id', SalesDetailController.getSalesById);

module.exports = RouterSalesDetail;
