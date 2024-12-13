'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 插入15条数据
    const members = []
    const counts = 15

    for (let i = 1; i <= counts; i++) {
      const member = {
        mname: `会员 ${ i }`,
        tel: `电话号码 ${ i }`,
        registerTime: new Date(),
        deposit: Math.floor((Math.random()*100)+1),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      members.push(member)
    }
    // 一次性插入到表中
    await queryInterface.bulkInsert('Members', members, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Members', null, {});
  }
};
