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
    const { email } = req.user;
    try {
      const result = await Login.loginValidate(email);
      if (result) {
        return res.status(200).json({ message: 'ok' });
      } 
        throw new Error('404|Pessoa não cadastrada');
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
};

module.exports = LoginController;
