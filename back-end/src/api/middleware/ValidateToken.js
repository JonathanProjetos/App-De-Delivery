const jwtCheckLogin = require('./Token');

module.exports = {
  loginToken: (req, _res, next) => {
    const { authorization } = req.headers;
    const dados = jwtCheckLogin.validateToken(authorization);
    req.user = dados;
    next();
  },
};
