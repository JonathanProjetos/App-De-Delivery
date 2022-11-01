const jwt = require('jsonwebtoken');
require('dotenv/config');
const jwtKey = require("fs")
  .readFileSync("./jwt.evaluation.key", { encoding: "utf-8" });

// const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

const jwtCheckLogin = {
  
  generateToken: (email) => {
    const token = jwt.sign({ email }, jwtKey, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  },
  
  validateToken: (token) => {
    if (!token) throw new Error('401|Token not found');
    try {
      const test = jwt.verify(token, jwtKey);
      return test;
    } catch (error) {
      console.log(jwtKey);
      throw new Error('401|Expired or invalid token');
    }
  },
};

module.exports = jwtCheckLogin;
