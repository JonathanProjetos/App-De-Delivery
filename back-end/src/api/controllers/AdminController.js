const Admin = require('../services/AdminService');

const AdminController = {

  getAllUsers: async (req, res) => {
    const result = await Admin.getAllUsers();
    return res.status(200).json(result);
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    const result = await Admin.deleteUser(id);
    return res.status(200).json(result);
  },
  createUser: async (req, res) => {
    const { body } = req;
    const result = await Admin.createUser(body);
    return res.status(201).json(result);
  },
};

module.exports = AdminController;
