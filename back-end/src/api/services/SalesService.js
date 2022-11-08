const { sale, user } = require('../../database/models');

const SalesService = {

  getSalesAll: async (email) => {
    const products = await user.findOne({ where: { email } });
    const result = await sale.findAll({ where: { userId: products.dataValues.id } });
    return result;
  },
};

module.exports = SalesService;
