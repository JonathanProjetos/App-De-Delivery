const Register = require('../services/RegisterService');

const RegisterController = {

  Register: async (req, res) => {
    const { body } = req;
    const result = await Register.Register(body);
    if (result === null) { // se retornar nulo (se usuario ja existir)
      // return res.status(409).json({ message: 'Usuario ja cadastrado' });
      throw new Error('409|Usuario ja cadastrado');
    }
    const { tokenData, role } = result;
    return res.status(201).json({ token: tokenData, role });
  },
};

module.exports = RegisterController;
