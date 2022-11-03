const { sale, sequelize, sale_product } = require('../../database/models');
// const ValidateId = require('../helper/checkArrayOrder');

const SaleProducts = {

  addSaleProducts: async (body) => {
    const transactionOrder = await sequelize.transaction(async (transaction) => {
      const {
        userId,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate,
        status,
        order,
      } = body;

      const result = await sale.create(
        {
          user_id: userId,
          seller_id: sellerId,
          total_price: totalPrice,
          delivery_address: deliveryAddress,
          delivery_number: deliveryNumber,
          sale_date: saleDate,
          status,
        },
        { transaction },
      );
      console.log(result);

      const postOrder = order
        .map((item) => ({ seller_id: sellerId, product_id: item.id, quantity: item.quantity }));

      await sale_product.bulkCreate(postOrder, { transaction });

      return result.dataValues.id;
    });
    return transactionOrder;
  },

};

module.exports = SaleProducts;
