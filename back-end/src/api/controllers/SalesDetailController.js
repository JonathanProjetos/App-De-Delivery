const Sales = require('../services/SaleDatailService');

const SalesDetailController = {

  getSalesById: async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    const resultSales = await Sales.getSalesById(id, email);
    return res.status(200).json(resultSales);
  },

  updateStatus: async (req, res) => {
    const { status, id } = req.body;
    console.log(id, status);
    await Sales.updateStatus(Number(id), status);
    return res.status(200).json({ message: 'atualizado com suscesso' });
  },
};

module.exports = SalesDetailController;
