'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('sales', { 
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    user_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },


    seller_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },

    total_price: {
      allowNull:false,
      type: Sequelize.STRING,
    },

    delivery_address: {
      allowNull:false,
      type: Sequelize.VARCHAR(100),
    },

    delivery_number: {
      allowNull:false,
      type: Sequelize.VARCHAR(50),
    },

    sale_date: {
      allowNull:false,
      type: Sequelize.DATE,
    },

    status: {
      allowNull: false,
      type: Sequelize.VARCHAR(50),
    }

  });
  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('sales');
   
  }
};
