const Login = require('../services/LoginService');

const Logincontroller = {

  Login: async (req, res) => {
    const { body } = req;
    const result = await Login.Login(body);
    return res.status(201).json({ token: result });
  },
};

module.exports = Logincontroller;
