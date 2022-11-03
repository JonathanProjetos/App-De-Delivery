const { user } = require('../../database/models');

const SellerService = {

  getSellers: async () => {
    const userSellers = await user.findAll({ where: { role: 'seller' } });
    return userSellers;
  },
};

module.exports = SellerService;
