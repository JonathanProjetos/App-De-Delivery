const Sales = require('../services/SalesDatailService');

const SalesDetailController = {

  getSalesById: async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    const resultSales = await Sales.getSalesById(id, email);
     
    return res.status(200).json(resultSales);
  },

  updateStatus: async (req, res) => {
    const { status, id } = req.body;
   
    await Sales.updateStatus(Number(id), status);
    return res.status(200).json({ message: 'atualizado com suscesso' });
  },

  getSalesAllSeller: async (req, res) => {
    const { email } = req.user;
    const result = await Sales.getSalesAllSeller(email);
    return res.status(200).json(result);
  },

  getSalesbyIdSeller: async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    const resultSales = await Sales.getSalesByIdSeller(id, email);
    return res.status(200).json(resultSales);
  },
};

module.exports = SalesDetailController;
