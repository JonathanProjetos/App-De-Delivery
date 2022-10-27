const express = require('express');
const RouterLogin = require('./router/RouterLogin');
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/', RouterLogin)

app.use((err, _req, res, _next) => {
  const [code, message] = err.message.split('|');
  return res.status(code).json({ message });
});

module.exports = app;
