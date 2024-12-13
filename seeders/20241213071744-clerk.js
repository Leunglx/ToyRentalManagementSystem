'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 插入10条数据
    const clerks = []
    const counts = 10

    for (let i = 1; i <= counts; i++) {
      const clerk = {
        cname: `职员名 ${ i }`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      clerks.push(clerk)
    }
    // 一次性插入到表中
    await queryInterface.bulkInsert('Clerks', clerks, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clerks', null, {});
  }
};
