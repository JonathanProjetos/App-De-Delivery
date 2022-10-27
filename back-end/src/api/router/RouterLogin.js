const express = require('express');

const RouterLogin = express.Router();
const LoginController = require('../controllers/LoginController');

RouterLogin.post('/login', LoginController.Login);

module.exports = RouterLogin;
