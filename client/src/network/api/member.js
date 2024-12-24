import { request } from '../request';

// 查询会员列表
export function getMemberList(params) {
  return request({
    url: `/admin/members`,
    method: 'get',
    params
  })
}

// 查询会员详情
export function getMemberDetail(id) {
  return request({
    url: `/admin/members/${id}`,
    method: 'get'
  })
}

// 新增会员
export function addMember(data) {
  return request({
    url: `/admin/members`,
    method: 'post',
    data
  })
}

// 更新会员信息
export function updateMember(id, data) {
  return request({
    url: `/admin/members/${id}`,
    method: 'put',
    data
  })
}

// 删除会员
export function deleteMember(id) {
  return request({
    url: `/admin/members/${id}`,
    method: 'delete'
  })
}
