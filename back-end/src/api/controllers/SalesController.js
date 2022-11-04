const Sales = require('../services/SalesService');
const LoginService = require('../services/LoginService');
// const Validate = require('../middleware/ValidateToken');

const SalesController = {

  getSalesAll: async (req, res) => {
    const { email } = req.user;
    try {
      // const { verifyEmail } = await LoginService.loginValidate(email);
      // if (!verifyEmail) {
      //   throw new Error('404|Pessoa não cadastrada');
      // } 

      if (req.params.id) {
        const { id } = req.params;
        const sale = resultSales.filter((i) => i.id === Number(id))
        console.log(id, sale);
        return res.status(200).json(sale)
      }  
      const resultSales = await Sales.getSalesAll(email);
      
      return res.status(200).json(resultSales || 'Não há deste vendas');
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
};

module.exports = SalesController;
