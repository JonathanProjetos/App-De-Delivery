const express = require('express');

const RouterLogin = express.Router();
const LoginController = require('../controllers/LoginController');

RouterLogin.post('/login', LoginController.Login);
RouterLogin.post('/login/validate', LoginController.loginValidate);
module.exports = RouterLogin;
