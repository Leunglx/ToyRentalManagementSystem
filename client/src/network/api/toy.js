import { request } from '../request';

// 查询玩具列表
export function getToyList(params) {
  return request({
    url: `/admin/toys`,
    method: 'get',
    params
  })
}

// 查询玩具详情
export function getToyDetail(id) {
  return request({
    url: `/admin/toys/${id}`,
    method: 'get'
  })
}

// 新增玩具
export function addToy(data) {
  return request({
    url: `/admin/toys`,
    method: 'post',
    data
  })
}

// 更新玩具信息
export function updateToy(id, data) {
  return request({
    url: `/admin/toys/${id}`,
    method: 'put',
    data
  })
}

// 删除玩具
export function deleteToy(id) {
  return request({
    url: `/admin/toys/${id}`,
    method: 'delete'
  })
}
