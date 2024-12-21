const express = require('express')
const router = express.Router()
// 引入模型
const { Clerk } = require('../../models')
const { Op } = require('sequelize')
const {
  NotFoundError,
  success,
  failure,
} = require('../../utils/response')

/**
 * 查询营业员列表
 * GET /admin/clerks
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
    if (query.cname) {
      condition.where = {
        cname: {
          [Op.like]: `%${query.cname}%`
        }
      }
    }

    // 数据在rows里
    const { count, rows } = await Clerk.findAndCountAll(condition)

    success(res, '查询营业员列表成功。',{ 
      clerks: rows,
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
 * 查询营业员详情
 * GET /admin/clerks/:id
 */
router.get('/:id',async function(req, res) {
  try {
    const clerk = await getClerk(req)
    success(res, '查询营业员成功。', { clerk })
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 创建营业员
 * POST /admin/clerks
 */
router.post('/', async function (req, res) {
  try {
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)

    const clerk = await Clerk.create(body)

    // 201表示成功的同时还创建了新资源
    success(res, '创建营业员成功', { clerk }, 201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除营业员
 * DELETE /admin/clerks/:id
 */
router.delete('/:id',async function(req, res) {
  try {
    const clerk = await getClerk(req)
    await clerk.destroy()
    success(res, '删除营业员成功。')
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 更新营业员
 * PUUT /admin/clerks/:id
 */
router.put('/:id',async function(req, res) {
  try {
    const clerk = await getClerk(req)
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)
    await clerk.update(body)
    res.json({ 
      status: true,
      message: '更新营业员成功。',
    })
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前营业员
 */
async function getClerk(req) {
  // 获取营业员id
  const { id } = req.params
  // 查询当前营业员
  const clerk = await Clerk.findByPk(id)
  // 如果没找到，就抛出异常
  if (!clerk) {
    throw new NotFoundError(`ID: ${ ID }的营业员未找到`)
  }

  return clerk
}

/**
 * 公共方法：白名单过滤 只把有用数据保留 防止用户输入其他干扰数据
 * @param req
 */
function filterBody(req) {
  return {
    cname: req.body.cname
  }
}

module.exports = router