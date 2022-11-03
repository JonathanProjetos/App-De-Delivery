const { sale, sequelize, saleProduct } = require('../../database/models');
// const ValidateId = require('../helper/checkArrayOrder');

const SaleProductsService = {

  addSaleProducts: async (body, order) => {
    const transactionOrder = await sequelize.transaction(async (transaction) => {
      const orderOrder = body;
      delete orderOrder.order;

      console.log(order);
    
      const result = await sale.create({ ...orderOrder }, { transaction });
      const idOrder = result.dataValues.id;
      
      const postOrder = order
        .map((item) => ({ saleId: idOrder, productId: item.id, quantity: item.quantity }));

      await saleProduct.bulkCreate(postOrder, { transaction });

      return idOrder;
    });
    return transactionOrder;
  },

};

module.exports = SaleProductsService;
