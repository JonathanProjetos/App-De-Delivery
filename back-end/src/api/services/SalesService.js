const { sale } = require('../../database/models');

const SalesService = {

  getSalesById: async (id) => {
    const products = await sale.findOne({ where: { id } });
    return products;
  },
};

module.exports = SalesService;
