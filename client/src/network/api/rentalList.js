import { request } from '../request';

// 查询玩具出租记录列表
export function getRentalListList(params) {
  return request({
    url: `/admin/rentalLists`,
    method: 'get',
    params
  })
}

// 查询玩具出租记录详情
export function getRentalListDetail(id) {
  return request({
    url: `/admin/rentalLists/${id}`,
    method: 'get'
  })
}

// 新增玩具出租记录
export function addRentalList(data) {
  return request({
    url: `/admin/rentalLists`,
    method: 'post',
    data
  })
}

// 更新玩具出租记录信息
export function updateRentalList(id, data) {
  return request({
    url: `/admin/rentalLists/${id}`,
    method: 'put',
    data
  })
}

// 删除玩具出租记录
export function deleteRentalList(id) {
  return request({
    url: `/admin/rentalLists/${id}`,
    method: 'delete'
  })
}
