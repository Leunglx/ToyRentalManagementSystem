'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentalList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.RentalList.belongsTo(models.Toy, { as: 'toy' })
      models.RentalList.belongsTo(models.Member, { as: 'member' })
      models.RentalList.belongsTo(models.Clerk, { as: 'clerk' })
    }
  }
  RentalList.init({
    toyId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '玩具ID必须存在。' },
        notEmpty: { msg: '玩具ID不能为空。' },
        async isPresent(value) {
          const toy = await sequelize.models.Toy.findByPk(value)
          if (!toy) throw new Error(`ID为：${ value }的玩具不存在。`)
        }
      }
    },
    memberId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '会员ID必须存在。' },
        notEmpty: { msg: '会员ID不能为空。' },
        async isPresent(value) {
          const member = await sequelize.models.Member.findByPk(value)
          if (!member) throw new Error(`ID为：${ value }的会员不存在。`)
        }
      }
    },
    clerkId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '营业员ID必须存在。' },
        notEmpty: { msg: '营业员ID不能为空。' },
        async isPresent(value) {
          const clerk = await sequelize.models.Clerk.findByPk(value)
          if (!clerk) throw new Error(`ID为：${ value }的营业员不存在。`)
        }
      }
    },
    rentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: '开始租借时间必须存在。' },
        notEmpty: { msg: '开始租借时间不能为空。' }
      }
    },
    returnDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RentalList',
  });
  return RentalList;
};