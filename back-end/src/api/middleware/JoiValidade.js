const Joi = require('joi');

const INVALID_EMAIL = '400|Campo de email não e valido';
const PASSWORD_REQUERED = '400|Campo password e obrigatório';
const validateLogin = (dados) => {
  const login = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': '400|Campo email e obrigatório',
      'string.empty': '400|Campo email não pode ser vazio',
      'string.email': INVALID_EMAIL,
    }),

    password: Joi.string().min(6).required().messages({
      'any.required': PASSWORD_REQUERED,
      'string.empty': '400|Campo password não pode ser vazio',
      'string.min': INVALID_EMAIL,
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
      'string.email': INVALID_EMAIL,
    }),
    password: Joi.string().min(6).required().messages({
      'any.required': PASSWORD_REQUERED,
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

const validateUser = (dados) => {
  const user = Joi.object({
    name: Joi.string().min(12).required().messages({
      'any.required': '400|Campo usuario e obrigatório',
      'string.min': '400|Campo usuario deve ter no minimo 12 caracters',
    }),
    email: Joi.string().email().required().messages({
      'string.email': INVALID_EMAIL,
    }),
    password: Joi.string().min(6).required().messages({
      'any.required': PASSWORD_REQUERED,
      'string.min': '400|Campo password deve ter no minimo 6 caracters',
    }),
    role: Joi.string().required().messages({
      'any.required': '400|Campo role e obrigatório',
      'string.empty': '400|Campo role não pode ser vazio',
    }) });
  const { error, value } = user.validate(dados);
  // console.log(error);
  if (error) { throw error; } return value;
};

module.exports = { validateLogin, validateRegister, validateUser };