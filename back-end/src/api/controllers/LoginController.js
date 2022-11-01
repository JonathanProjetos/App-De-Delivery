const LoginService = require('../services/LoginService');

const LoginController = {

  Login: async (req, res) => {
    const { body } = req;
    console.log(body);
    const result = await LoginService.Login(body);
    return res.status(200).json(result);
  },

  loginValidate: async (req, res) => {
    const { email } = req.user;
    await LoginService.loginValidate(email);
    return res.status(200).json({ message: 'ok' });
  },
};

module.exports = LoginController;
