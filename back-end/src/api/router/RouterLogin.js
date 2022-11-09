const express = require('express');

const RouterLogin = express.Router();
const ValidateToken = require('../middleware/ValidateToken');
const LoginController = require('../controllers/LoginController');

RouterLogin.post('/login', LoginController.Login);
RouterLogin.post('/login/validate', ValidateToken.loginToken, LoginController.loginValidate);
module.exports = RouterLogin;
