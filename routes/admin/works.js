const express = require('express')
const router = express.Router()
// 引入模型
const { Work } = require('../../models')
const { Op } = require('sequelize')
const {
  NotFoundError,
  success,
  failure,
} = require('../../utils/response')

/**
 * 查询值班记录列表
 * GET /admin/works
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
    if (query.clerkId) {
      condition.where = {
        clerkId: {
          [Op.like]: `%${query.clerkId}%`
        }
      }
    }

    // 数据在rows里
    const { count, rows } = await Work.findAndCountAll(condition)

    success(res, '查询值班记录列表成功。',{ 
      works: rows,
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
 * 查询值班记录详情
 * GET /admin/works/:id
 */
router.get('/:id',async function(req, res) {
  try {
    const work = await getWork(req)
    success(res, '查询值班记录成功。', { work })
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 创建值班记录
 * POST /admin/works
 */
router.post('/', async function (req, res) {
  try {
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)

    const work = await Work.create(body)

    // 201表示成功的同时还创建了新资源
    success(res, '创建值班记录成功', { work }, 201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除值班记录
 * DELETE /admin/works/:id
 */
router.delete('/:id',async function(req, res) {
  try {
    const work = await getWork(req)
    await work.destroy()
    success(res, '删除值班记录成功。')
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 更新值班记录
 * PUUT /admin/works/:id
 */
router.put('/:id',async function(req, res) {
  try {
    const work = await getWork(req)
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)
    await work.update(body)
    res.json({ 
      status: true,
      message: '更新值班记录成功。',
    })
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前值班记录
 */
async function getWork(req) {
  // 获取值班记录id
  const { id } = req.params
  // 查询当前值班记录
  const work = await Work.findByPk(id)
  // 如果没找到，就抛出异常
  if (!work) {
    throw new NotFoundError(`ID: ${ ID }的值班记录未找到`)
  }

  return work
}

/**
 * 公共方法：白名单过滤 只把有用数据保留 防止用户输入其他干扰数据
 * @param req
 */
function filterBody(req) {
  return {
    clerkId: req.body.clerkId,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  }
}

module.exports = router