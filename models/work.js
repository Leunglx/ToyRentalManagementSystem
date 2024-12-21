'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // as是别名
      models.Work.belongsTo(models.Clerk, { as: 'clerk' })
    }
  }
  Work.init({
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
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: '开始值班时间必须存在。' },
        notEmpty: { msg: '开始值班时间不能为空。' }
      }
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: '结束值班时间必须存在。' },
        notEmpty: { msg: '结束值班时间不能为空。' }
      }
    }
  }, {
    sequelize,
    modelName: 'Work',
  });
  return Work;
};