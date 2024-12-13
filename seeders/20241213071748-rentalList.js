'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RentalLists', [
      {
        tid: 1,
        mid: 1,
        cid: 1,
        rentDate: new Date(),
        returnDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tid: 3,
        mid: 2,
        cid: 5,
        rentDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tid: 6,
        mid: 4,
        cid: 8,
        rentDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tid: 8,
        mid: 8,
        cid: 8,
        rentDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tid: 7,
        mid: 9,
        cid: 10,
        rentDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RentalLists', null, {});
  }
};
