const Sales = require('../services/SalesService');

const SalesController = {

  getSalesAll: async (req, res) => {
    const { email } = req.user;
    try {
      const resultSales = await Sales.getSalesAll(email);

      if (req.params.id) {
        const { id } = req.params;
        const sale = resultSales.filter((i) => i.id === Number(id));
        return res.status(200).json(sale);
      }  
      
      return res.status(200).json(resultSales || 'Não há deste vendas');
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
};

module.exports = SalesController;
