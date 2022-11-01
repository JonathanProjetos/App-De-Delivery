const { user, sale, sequelize, saleProduct } = require('../../database/models');
const ValidateId = require('../helper/checkArrayOrder');

const SaleProducts = {

  addSaleProducts: async ({ arrayOrder }, email) => {
    const transactionOrder = await sequelize.transaction(async (transaction) => {
      await ValidateId(arrayOrder);

      const checkId = await user.findOne({
        where: { email },
      });

      const result = await sale.create(
        { saleId: checkId.dataValues.id }, 
        { transaction },
      );

      const postOrder = arrayOrder
        .map((iten) => ({ saleId: result.id, productId: iten }));
        
      await saleProduct.bulkcreate(postOrder, { transaction });
    }); 
    return transactionOrder;
  },

};

export default SaleProducts;
