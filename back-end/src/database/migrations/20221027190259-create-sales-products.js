'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('salesProducts', { 

      sale_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'sales',
          key: 'id',
        },
      },

      product_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'products',
          key: 'id',
        },
      },

      quantity: {
        type: Sequelize.INTEGER,
      }
      
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('salesProducts');
  
  }
};
