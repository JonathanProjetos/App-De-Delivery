const Register = require('../services/RegisterService');

const RegisterController = {

  Register: async (req, res) => {
    const { body } = req;
    const result = await Register.Register(body);
    console.log(body);
    if (result === null) { // se retornar nulo (se usuario ja existir)
      // return res.status(409).json({ message: 'Usuario ja cadastrado' });
      throw new Error('409|Usuario ja cadastrado');
    }
    return res.status(201).json({ result });
  },
};

module.exports = RegisterController;
