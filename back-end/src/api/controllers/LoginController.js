const Login = require('../services/LoginService');

const LoginController = {

  Login: async (req, res) => {
    const { body } = req;
    console.log(body);
    const result = await Login.Login(body);
    const { tokenData, role } = result;
    return res.status(200).json({ token: tokenData, role });
  },
  loginValidate: async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });
    try {
      const result = await Login.loginValidate(authorization);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
};

module.exports = LoginController;
