'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clerk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Clerk.hasMany(models.Work, { as: 'works' }) // 一个营业员有多条值班记录，所以是复数s
      models.Clerk.hasMany(models.RentalList, { as: 'rentalLists' })
    }
  }
  Clerk.init({
    cname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '营业员名必须存在。' },
        notEmpty: { msg: '营业员名不能为空。' },
        len: { args: [2,20], msg: '营业员名长度需要在2~20个字符之间。' }
      }
    }
  }, {
    sequelize,
    modelName: 'Clerk',
  });
  return Clerk;
};