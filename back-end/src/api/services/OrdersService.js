const { sale } = require('../../database/models');

const ProductService = {

  getOrders: async () => {
    const ordersTeste = await sale.findAll();
    const result = ordersTeste.map((user) => user.dataValues);
    return result;
  },
};

module.exports = ProductService;
