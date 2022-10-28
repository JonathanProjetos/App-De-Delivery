const { user } = require('../../database/models');
const token = require('../middleware/Token');
const joiRegister = require('../middleware/JoiValidade');
const md5 = require('md5');

const RegisterServices = {

  Register: async (body) => {
    const validateUser = joiRegister.validateRegister(body);
    const { email, password, name } = validateUser;
    const findUser = await user.findOne({ where: { email } });
    if (findUser) {
      return null; // se encontrar um usuario ja existente, retorna nulo
    }
    const tokenPass = md5(password);
    console.log(tokenPass);
    const newUser = await user.create({ name, email, password: tokenPass, role: 'customer'});
    return newUser;
  },
};

module.exports = RegisterServices;
