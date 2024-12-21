const express = require('express');
const { failure, success } = require('../utils/response');
const { Toy } = require('../models')
const router = express.Router();

/* 首页/玩具列表 */
router.get('/', async function(req, res, next) {
  try {
    const toys = await Toy.findAll({
      order: [['id', 'desc']],
      limit: 10
    })

    success(res, '获取首页数据成功', {
      toys
    })
  } catch (error) {
    failure(res, error)
  }
});

module.exports = router;
