const SellersServce = require('../services/SellerService');

const SellerController = {

  getSellers: async (_req, res) => {
    const result = await SellersServce.getSellers();
    return res.status(200).json(result);
  },
};

module.exports = SellerController;
