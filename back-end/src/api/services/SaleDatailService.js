const { sale, user, product } = require('../../database/models');

const SaleDetailService = {

  getSalesById: async (id) => {
    const result = await sale.findAll({
      where: { id }, 
        include: [{
          model: user,
          as: 'user',
         }, {
          model: product,
          as: 'products',
        }],
    });

    return result;
  },
};

module.exports = SaleDetailService;
