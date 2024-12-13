'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 插入50条数据
    const toys = []
    const counts = 50

    for (let i = 1; i <= counts; i++) {
      const toy = {
        tname: `玩具名 ${ i }`,
        price: Math.floor((Math.random()*100)+1),
        attachmentNum: Math.floor((Math.random()*10)+1),
        purchaseDate: new Date(),
        isRented: Math.round(Math.random()),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      toys.push(toy)
    }
    // 一次性插入到表中
    await queryInterface.bulkInsert('Toys', toys, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Toys', null, {})
  }
};
