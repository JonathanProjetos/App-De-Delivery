const Sales = require('../services/SalesService');

const SalesDetailController = {

  getSalesById: async (req, res) => {
    const { id } = req.params;
      const resultSales = await Sales.getSalesById(id);
      return res.status(200).json(resultSales);
  },
};

module.exports = SalesDetailController;
