const express = require('express')
const router = express.Router()
// 引入模型
const { RentalList, Toy, Member } = require('../../models')
const { Op } = require('sequelize')
const {
  NotFoundError,
  success,
  failure,
} = require('../../utils/response')

/**
 * 查询玩具出租列表
 * GET /admin/rentalLists
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
    if (query.toyId) {
      condition.where = {
        toyId: {
          [Op.like]: `%${query.toyId}%`
        }
      }
    }
    if (query.memberId) {
      condition.where = {
        memberId: {
          [Op.like]: `%${query.memberId}%`
        }
      }
    }
    if (query.clerkId) {
      condition.where = {
        clerkId: {
          [Op.like]: `%${query.clerkId}%`
        }
      }
    }
    // 数据在rows里
    const { count, rows } = await RentalList.findAndCountAll(condition)
    
    success(res, '查询玩具出租列表成功。',{ 
      rentalLists: rows,
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
 * 查询玩具出租详情
 * GET /admin/rentalLists/:id
 */
router.get('/:id',async function(req, res) {
  try {
    const rentalList = await getRentalList(req)
    success(res, '查询玩具出租记录成功。', { rentalList })
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 创建玩具出租记录
 * POST /admin/rentalLists
 */
router.post('/', async function (req, res) {
  try {
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)

    // 查询前端传的玩具、会员记录（判断是否存在已经在models里写过了）
    const toy = await Toy.findByPk(body.toyId)
    const member = await Member.findByPk(body.memberId)
    let deposit = member.deposit

    // 是否有id相同且未归还的玩具（就是查玩具被租了没有）
    const rentedToy = await RentalList.findOne({
      where: {
        toyId: body.toyId,
        returnDate: null
      }
    })
    // 没找到这条记录 说明该玩具还没被租/上一次出租已完成
    if (!rentedToy) {
      const rentalList = await RentalList.create(body)
      // 201表示成功的同时还创建了新资源
      success(res, '创建玩具出租记录成功', { rentalList }, 201)
      // 更新出租状态、押金
      await Toy.update({ isRented: 1 }, { where: { id: body.toyId } })
      deposit += toy.price
      await Member.update({ deposit }, { where: { id: body.memberId } })
    } else {
      throw new Error(`ID为 ${ body.toyId } 的玩具已被出租。`)
    }
  } catch (error) {
    failure(res,error)
  }
})

/**
 * 删除玩具出租记录
 * DELETE /admin/rentalLists/:id
 */
router.delete('/:id',async function(req, res) {
  try {
    const rentalList = await getRentalList(req)
    await rentalList.destroy()
    success(res, '删除玩具出租记录成功。')
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 更新玩具出租记录
 * PUUT /admin/rentalLists/:id
 */
router.put('/:id',async function(req, res) {
  try {
    const rentalList = await getRentalList(req)
    // 白名单过滤 防止用户在表单输入无关数据
    const body = filterBody(req)

    // 查询前端传的玩具、会员记录（判断是否存在已经在models里写过了）
    const toy = await Toy.findByPk(body.toyId)
    const member = await Member.findByPk(body.memberId)
    let deposit = member.deposit

    await rentalList.update(body)
    res.json({ 
      status: true,
      message: '更新玩具出租记录成功。',
    })
    // 玩具归还
    if (body.returnDate != null) {
      await Toy.update({ isRented: 0 }, { where: { id: body.toyId } })
      deposit -= toy.price
      await Member.update({ deposit }, { where: { id: body.memberId } })
    }
    // 有时候误改归还日期了 需要把isRented和deposit改回来（就是还是已出租的状态） 
    else {
      await Toy.update({ isRented: 1 }, { where: { id: body.toyId } })
      deposit += toy.price
      await Member.update({ deposit }, { where: { id: body.memberId } })
    }
  } catch(error) {
    failure(res,error)
  }
})

/**
 * 公共方法：查询当前玩具出租记录
 */
async function getRentalList(req) {
  // 获取玩具出租id
  const { id } = req.params
  // 查询当前玩具出租
  const rentalList = await RentalList.findByPk(id)
  // 如果没找到，就抛出异常
  if (!rentalList) {
    throw new NotFoundError(`ID: ${ ID }的玩具出租记录未找到`)
  }

  return rentalList
}

/**
 * 公共方法：白名单过滤 只把有用数据保留 防止用户输入其他干扰数据
 * @param req
 */
function filterBody(req) {
  return {
    toyId: req.body.toyId,
    memberId: req.body.memberId,
    clerkId: req.body.clerkId,
    rentDate: req.body.rentDate,
    returnDate: req.body.returnDate
  }
}

module.exports = router