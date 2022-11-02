const Joi = require('joi');

const validateLogin = (dados) => {
  const login = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': '400|Campo email e obrigatório',
      'string.empty': '400|Campo email não pode ser vazio',
      'string.email': '400|Campo de email não e valido',
    }),

    password: Joi.string().min(6).required().messages({
      'any.required': '400|Campo password e obrigatório',
      'string.empty': '400|Campo password não pode ser vazio',
      'string.min': '400|Campo password deve ter no minimo 6 caracters',
    }),
  });  

  const { error, value } = login.validate(dados);

  // console.log(error);
  if (error) {
    throw error;
  }
  return value;
};

const validateRegister = (dados) => {
  const register = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': '400|Campo de email não e valido',
    }),
    password: Joi.string().min(6).required().messages({
      'any.required': '400|Campo password e obrigatório',
      'string.empty': '400|Campo password não pode ser vazio',
      'string.min': '400|Campo password deve ter no minimo 6 caracters',
    }),
    name: Joi.string().min(12).required().messages({
      'any.required': '400|Campo usuario e obrigatório',
      'string.empty': '400|Campo usuario não pode ser vazio',
      'string.min': '400|Campo usuario deve ter no minimo 12 caracters',
    }),
  });
  const { error, value } = register.validate(dados);
  if (error) { throw error; } return value;
};

module.exports = { validateLogin, validateRegister };