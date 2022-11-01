const Sales = require('../services/SalesService');
const LoginService = require('../services/LoginService');
// const Validate = require('../middleware/ValidateToken');

const SalesController = {

  getSalesById: async (req, res) => {
    const { email } = req.user;
    try {
      const { verifyEmail } = await LoginService.loginValidate(email);
      if (!verifyEmail) {
        throw new Error('404|Pessoa não cadastrada');
      } 
      const resultSales = await Sales.getSalesById(verifyEmail.dataValues.id);
      return res.status(200).json(resultSales || 'Não há deste vendas');
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
};

module.exports = SalesController;
