const Sales = require('../services/SaleDatailService');

const SalesDetailController = {

  getSalesById: async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    const resultSales = await Sales.getSalesById(id, email);
      console.log(resultSales);
    return res.status(200).json(resultSales);
  },
};

module.exports = SalesDetailController;
