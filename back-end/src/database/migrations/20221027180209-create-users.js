'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('users', { 
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    name: {
      allowNull:false,
      type: Sequelize.VARCHAR(255),
    },

    email: {
      allowNull:false,
      type: Sequelize.VARCHAR(255),
    },

    password: {
      allowNull:false,
      type: Sequelize.VARCHAR(255),
    },

    role: {
      allowNull:false,
      type: Sequelize.VARCHAR(255),
    },

   });
     
  },

  async down (queryInterface, Sequelize) {
 
  await queryInterface.dropTable('users');
     
  }
};
