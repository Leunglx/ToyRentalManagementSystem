import { request } from '../request';

// 查询值班记录列表
export function getWorkList(params) {
  return request({
    url: `/admin/works`,
    method: 'get',
    params
  })
}

// 查询值班记录详情
export function getWorkDetail(id) {
  return request({
    url: `/admin/works/${id}`,
    method: 'get'
  })
}

// 新增值班记录
export function addWork(data) {
  return request({
    url: `/admin/works`,
    method: 'post',
    data
  })
}

// 更新值班记录信息
export function updateWork(id, data) {
  return request({
    url: `/admin/works/${id}`,
    method: 'put',
    data
  })
}

// 删除值班记录
export function deleteWork(id) {
  return request({
    url: `/admin/works/${id}`,
    method: 'delete'
  })
}
