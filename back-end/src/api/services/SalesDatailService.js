const { sale, user, product } = require('../../database/models');

const SaleDetailService = {

  getSalesById: async (id, email) => {
    const result = await user.findAll({
      where: { email },
      attributes: { exclude: ['password'] },
      include: [{
          model: sale,
          as: 'sale',
          where: { id },
          include: {
              model: product,
              as: 'products',
          },  
        }],
    });
    return result;
  },

  updateStatus: async (id, status) => {
    const saleId = await user.findOne({ where: { id } });
    if (!saleId) throw new Error('404|Venda não encontrada');

    await sale.update({ status },
      { where: { id } });
  },

  getSalesAllSeller: async (email) => {
    const result = await user.findAll({
      where: { email }, 
      include: {
        model: sale,
        as: 'seller',
      },
    });
    return result;
  },

  getSalesByIdSeller: async (id, email) => {
    const result = await user.findAll({
      where: { email },
      attributes: { exclude: ['password'] },
      include: [{
          model: sale,
          as: 'seller',
          where: { id },
          include: {
              model: product,
              as: 'products',
          },  
        }],
    });
    return result;
  },
  
};

module.exports = SaleDetailService;
