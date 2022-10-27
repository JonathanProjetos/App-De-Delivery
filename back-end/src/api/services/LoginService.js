const { user } = require('../../database/models');
const joiLogin = require('../middleware/joiValidate');
const token = require('../middleware/tokenLogin');

const LoginServices = {

  Login: async (body) => {
    const checkBody = joiLogin.validateLogin(body);
    const { email, password } = checkBody;
    const verifyEmail = await user.findOne({
      where: { email, password },
    });

    if (!verifyEmail) throw new Error('400|Pessoa não cadastrada');
    const generateToken = token.generateToken(email);
    return generateToken;
  },
};

module.exports = LoginServices;
