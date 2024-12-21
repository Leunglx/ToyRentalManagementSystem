'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment/moment')

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Member.hasMany(models.RentalList, { as: 'rentalLists' })
    }
  }
  Member.init({
    mname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '会员名必须存在。' },
        notEmpty: { msg: '会员名不能为空。' },
        len: { args: [2,20], msg: '会员名长度需要在2~20个字符之间。' }
      }
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '联系方式必须存在。' },
        notEmpty: { msg: '联系方式不能为空。' },
        len: { args: [8,11], msg: '联系方式格式不正确。' }
      }
    },
    registerTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: '注册会员时间必须存在。' },
        notEmpty: { msg: '注册会员时间不能为空。' },
        isDate: { msg: '日期格式不正确。' },
      },
      get() {
        return moment(this.getDataValue('registerTime')).format('YYYY.MM.DD')
      }
    },
    deposit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};