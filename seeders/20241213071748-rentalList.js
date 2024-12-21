'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RentalLists', [
      {
        toyId: 1,
        memberId: 1,
        clerkId: 1,
        rentDate: new Date(),
        returnDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        toyId: 3,
        memberId: 2,
        clerkId: 5,
        rentDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        toyId: 6,
        memberId: 4,
        clerkId: 8,
        rentDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        toyId: 8,
        memberId: 8,
        clerkId: 8,
        rentDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        toyId: 7,
        memberId: 9,
        clerkId: 10,
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
