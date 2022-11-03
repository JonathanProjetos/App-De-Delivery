const express = require('express');

const RouterSeller = express.Router();
const SellerController = require('../controllers/SellerController');

RouterSeller.get('/customer/seller', SellerController.getSellers);

module.exports = RouterSeller;
