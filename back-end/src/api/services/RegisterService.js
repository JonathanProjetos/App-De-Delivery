const md5 = require('md5');
const { user } = require('../../database/models');
const joiRegister = require('../middleware/JoiValidade');

const RegisterServices = {

  Register: async (body) => {
    const validateUser = joiRegister.validateRegister(body);
    const { email, password, name } = validateUser;
    const findUser = await user.findOne({ where: { email } });
    if (findUser) {
      return null; // se encontrar um usuario ja existente, retorna nulo
    }
    const tokenPass = md5(password);
  
    const newUser = await user.create({ name, email, password: tokenPass, role: 'customer' });
    return newUser;
  },
};

module.exports = RegisterServices;
