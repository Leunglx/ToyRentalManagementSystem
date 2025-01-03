const express = require('express')
const router = express.Router()
// 引入模型
const { Toy } = require('../../models')
const { Op } = require('sequelize')
const {
  NotFoundError,
  success,
  failure,
} = require('../../utils/response')

/**
 * 查询玩具列表
 * GET /admin/toys
 */
router.get('/',async function(req, res) {
  try {
    // 模糊查询
    const query = req.query
    // 当前是第几页 如果不传 就是第一页
    const currentPage = Math.abs(Number(query.currentPage)) || 1 // abs:可能传负数 要转正数；Number：字符串转整数
    // 每页显示多少条 如果不传 就显示10条
    const pageSize = Math.abs(Number(query.pageSize)) || 10
    // 计算Offset 每页开始的下标位置
    const offset = (currentPage - 1) * pageSize
    // 查询条件
    const condition = {
      order: [['id', 'DESC']],
      limit: pageSize,
      offset
    }

    // 模糊查询
    if (query.tname) {
      condition.where = {
        tname: {
          [Op.like]: `%${query.tname}%`
        }
      }
    }

    // 数据在rows里
    const { count, rows } = await Toy.findAndCountAll(condition)

    success(res, '查询玩具列表成功。',{ 
      toys: rows,
      pagenition: {
        total: count,
        currentPage,
        pageSize
      }
    })
  } 
  catch(error) {
    failure(res,error)
  }
})

/**
 * 查询玩具详情
 * GET /admin/toys/:id
 */
router.get('/:id',async function(req, res) {
  try {
    const toy = await getToy(req)
    success(res, '查询玩具成功。', { toy })
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 创建玩具
 * POST /admin/toys
 */
router.post('/', async function (req, res) {
  try {
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)

    const toy = await Toy.create(body)

    // 201表示成功的同时还创建了新资源
    success(res, '创建玩具成功', { toy }, 201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除玩具
 * DELETE /admin/toys/:id
 */
router.delete('/:id',async function(req, res) {
  try {
    const toy = await getToy(req)
    await toy.destroy()
    success(res, '删除玩具成功。')
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 更新玩具
 * PUUT /admin/toys/:id
 */
router.put('/:id',async function(req, res) {
  try {
    const toy = await getToy(req)
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)
    await toy.update(body)
    res.json({ 
      status: true,
      message: '更新玩具成功。',
    })
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前玩具
 */
async function getToy(req) {
  // 获取玩具id
  const { id } = req.params
  // 查询当前玩具
  const toy = await Toy.findByPk(id)
  // 如果没找到，就抛出异常
  if (!toy) {
    throw new NotFoundError(`ID: ${ ID }的玩具未找到`)
  }

  return toy
}

/**
 * 公共方法：白名单过滤 只把有用数据保留 防止用户输入其他干扰数据
 * @param req
 */
function filterBody(req) {
  return {
    tname: req.body.tname,
    price: req.body.price,
    attachmentNum: req.body.attachmentNum,
    purchaseDate: req.body.purchaseDate,
    isRented: req.body.isRented,
    damageCondition: req.body.damageCondition
  }
}

module.exports = router