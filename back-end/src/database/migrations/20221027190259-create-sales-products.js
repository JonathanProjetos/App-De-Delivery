'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', { 

      sale_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        primaryKey: true,
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
        primaryKey: true,
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
    await queryInterface.dropTable('sales_products');
  
  }
};
