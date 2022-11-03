const md5 = require('md5');
const { user } = require('../../database/models');
const JoiValidade = require('../middleware/JoiValidade');

const ProductService = {

  getAllUsers: async () => {
    const users = await user.findAll({ attributes: { exclude: ['password'] } });
    const resultUsers = users.map((u) => u.dataValues);
    return resultUsers;
  },
  deleteUser: async (id) => {
    const result = await user.destroy({ where: { id } });
    return result;
  },
  createUser: async (body) => {
    JoiValidade.validateUser(body);
    const verifyUser = await user.findOne({ where: { email: body.email } });
    if (verifyUser) throw new Error('409|- Conflict');
    const { name, email, password, role } = body;
    const tokenPass = md5(password);
    const result = await user.create(
      { name, email, password: tokenPass, role }, { attributes: { exclude: ['password'] } },
      );
    return result.dataValues;
  },
};

module.exports = ProductService;
