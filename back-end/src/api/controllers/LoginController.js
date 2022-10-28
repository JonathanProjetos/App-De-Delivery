const Login = require('../services/LoginService');

const LoginController = {

  Login: async (req, res) => {
    const { body } = req;
    const result = await Login.Login(body);
    return res.status(201).json({ token: result });
  },
};

module.exports = LoginController;
