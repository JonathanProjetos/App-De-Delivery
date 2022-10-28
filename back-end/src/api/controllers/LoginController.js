const Login = require('../services/LoginService');

const LoginController = {

  Login: async (req, res) => {
    const { body } = req;
    console.log(body);
    const result = await Login.Login(body);
    const { tokenData, role } = result;
    return res.status(200).json({ token: tokenData, role });
  },
};

module.exports = LoginController;
