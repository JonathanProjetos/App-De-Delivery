const { user } = require('../../database/models');

const SellerService = {

  getSellers: async () => {
    const userSellers = await user.findAll({ 
      where: { role: 'seller' },
      attributes: { exclude: ['password'] },
    });
    return userSellers;
  },
};

module.exports = SellerService;
