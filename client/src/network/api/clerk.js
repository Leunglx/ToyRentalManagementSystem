import { request } from '../request';

// 查询营业员列表
export function getClerkList(params) {
  return request({
    url: `/admin/clerks`,
    method: 'get',
    params
  })
}

// 查询营业员详情
export function getClerkDetail(id) {
  return request({
    url: `/admin/clerks/${id}`,
    method: 'get'
  })
}

// 新增营业员
export function addClerk(data) {
  return request({
    url: `/admin/clerks`,
    method: 'post',
    data
  })
}

// 更新营业员信息
export function updateClerk(id, data) {
  return request({
    url: `/admin/clerks/${id}`,
    method: 'put',
    data
  })
}

// 删除营业员
export function deleteClerk(id) {
  return request({
    url: `/admin/clerks/${id}`,
    method: 'delete'
  })
}
