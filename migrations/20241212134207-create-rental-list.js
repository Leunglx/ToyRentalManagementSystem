'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RentalLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      toyId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      memberId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      clerkId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      rentDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      returnDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // index索引
    await queryInterface.addIndex(
      'RentalLists', {
        fields: ['toyId'], // 要索引的字段
      }
    );
    await queryInterface.addIndex(
      'RentalLists', {
        fields: ['memberId'], // 要索引的字段
      }
    );
    await queryInterface.addIndex(
      'RentalLists', {
        fields: ['clerkId'], // 要索引的字段
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RentalLists');
  }
};