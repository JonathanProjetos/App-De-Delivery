const express = require('express');

const RouterOrder = express.Router();
const OrderController = require('../controllers/OrderController');

RouterOrder.get('/customer/orders', OrderController.getOrders);

module.exports = RouterOrder;