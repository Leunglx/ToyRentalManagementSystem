'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Works', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      cid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false
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
      'Works', {
        fields: ['cid'], // 要索引的字段
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Works');
  }
};