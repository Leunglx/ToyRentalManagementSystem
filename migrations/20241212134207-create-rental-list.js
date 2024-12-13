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
      tid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      mid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      cid: {
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
        fields: ['tid'], // 要索引的字段
      }
    );
    await queryInterface.addIndex(
      'RentalLists', {
        fields: ['mid'], // 要索引的字段
      }
    );
    await queryInterface.addIndex(
      'RentalLists', {
        fields: ['cid'], // 要索引的字段
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RentalLists');
  }
};