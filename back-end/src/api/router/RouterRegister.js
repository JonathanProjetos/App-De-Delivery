const express = require('express');

const RouterRegister = express.Router();
const RegisterController = require('../controllers/RegisterController');

RouterRegister.post('/register', RegisterController.Register);

module.exports = RouterRegister;
