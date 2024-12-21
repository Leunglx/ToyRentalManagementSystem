const express = require('express')
const router = express.Router()
// 引入模型
const { Member } = require('../../models')
const { Op } = require('sequelize')
const {
  NotFoundError,
  success,
  failure,
} = require('../../utils/response')

/**
 * 查询会员列表
 * GET /admin/members
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
    if (query.mname) {
      condition.where = {
        mname: {
          [Op.like]: `%${query.mname}%`
        }
      }
    }

    // 数据在rows里
    const { count, rows } = await Member.findAndCountAll(condition)

    success(res, '查询会员列表成功。',{ 
      members: rows,
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
 * 查询会员详情
 * GET /admin/members/:id
 */
router.get('/:id',async function(req, res) {
  try {
    const member = await getMember(req)
    success(res, '查询会员成功。', { member })
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 创建会员
 * POST /admin/members
 */
router.post('/', async function (req, res) {
  try {
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)

    const member = await Member.create(body)

    // 201表示成功的同时还创建了新资源
    success(res, '创建会员成功', { member }, 201)
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除会员
 * DELETE /admin/members/:id
 */
router.delete('/:id',async function(req, res) {
  try {
    const member = await getMember(req)
    await member.destroy()
    success(res, '删除会员成功。')
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 更新会员
 * PUUT /admin/members/:id
 */
router.put('/:id',async function(req, res) {
  try {
    const member = await getMember(req)
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)
    await member.update(body)
    res.json({ 
      status: true,
      message: '更新会员成功。',
    })
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前会员
 */
async function getMember(req) {
  // 获取会员id
  const { id } = req.params
  // 查询当前会员
  const member = await Member.findByPk(id)
  // 如果没找到，就抛出异常
  if (!member) {
    throw new NotFoundError(`ID: ${ ID }的会员未找到`)
  }

  return member
}

/**
 * 公共方法：白名单过滤 只把有用数据保留 防止用户输入其他干扰数据
 * @param req
 */
function filterBody(req) {
  return {
    mname: req.body.mname,
    tel: req.body.tel,
    registerTime: req.body.registerTime,
    deposit: req.body.deposit
  }
}

module.exports = router