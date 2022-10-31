const jwt = require('jsonwebtoken');

const JWT_SECRET  = 'secret_key';

const jwtCheckLogin = {

  generateToken: (email) => {
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  },

  validateToken: (token) => {
    if (!token) throw new Error('401|Token not found');
    try {
      const test = jwt.verify(token, JWT_SECRET);
      return test;
    } catch (error) {
      throw new Error('401|Expired or invalid token');
    }
  },
};

module.exports = jwtCheckLogin;
