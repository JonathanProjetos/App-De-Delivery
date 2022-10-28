const md5 = require('md5');
const { user } = require('../../database/models');
const joiLogin = require('../middleware/JoiValidade');
const token = require('../middleware/Token');

const LoginServices = {

  Login: async (body) => {
    const checkBody = joiLogin.validateLogin(body);
    const { email, password } = checkBody;

    const verifyEmail = await user.findOne({
      where: { email, password: md5(password) },
    });

    if (!verifyEmail) throw new Error('401|Pessoa não cadastrada');

    const generateToken = token.generateToken(email);
    return generateToken;
  },
};

module.exports = LoginServices;
