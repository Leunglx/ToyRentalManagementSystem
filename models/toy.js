'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Toy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Toy.hasMany(models.RentalList, { as: 'rentalLists' })
    }
  }
  Toy.init({
    tid: DataTypes.INTEGER,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: '出租价格必须存在。' },
        notEmpty: { msg: '出租价格不能为空。' }
      }
    },
    attachmentNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: '玩具的附件数量必须存在。' },
        notEmpty: { msg: '玩具的附件数量不能为空。' }
      }
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: '进货时间必须存在。' },
        notEmpty: { msg: '进货时间不能为空。' }
      }
    },
    isRented: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: '出租状态必须存在（0:未出租，1:已出租）。' },
        notEmpty: { msg: '出租状态不能为空（0:未出租，1:已出租）。' }
      }
    },
    damageCondition: {
      type: DataTypes.TEXT,
      validate: {
        len: { args: [10,100], msg: '损坏情况描述需要在10~100个字符之间。' }
      }
    }
  }, {
    sequelize,
    modelName: 'Toy',
  });
  return Toy;
};