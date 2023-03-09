const LoginService = require('../services/LoginService');

const LoginController = {

  Login: async (req, res) => {
    const { body } = req;
    const result = await LoginService.Login(body);
    return res.status(200).json(result);
  },

  loginValidate: async (req, res) => {
    const { email } = req.user;
    console.log('olá');
    await LoginService.loginValidate(email);
    return res.status(200).json(true);
  },

};

module.exports = LoginController;
