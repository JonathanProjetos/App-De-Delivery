const Login = require('../services/LoginService');

const LoginController = {

  Login: async (req, res) => {
    const { body } = req;
    console.log(body);
    const result = await Login.Login(body);
    const { tokenData, role, name } = result;
    return res.status(200).json({ token: tokenData, role, name });
  },
};

module.exports = LoginController;
