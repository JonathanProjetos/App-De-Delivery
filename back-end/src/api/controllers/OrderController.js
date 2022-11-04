const Orders = require('../services/OrdersService');

const OrdersController = {

  getOrders: async (req, res) => {
    const result = await Orders.getOrders();
    return res.status(200).json(result);
  },
};

module.exports = OrdersController;
