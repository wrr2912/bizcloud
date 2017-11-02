import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getRoleTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize
  console.log(params)
  return request({
    url: `${serviceDomain}/sys/role/findRoleList?pageNumber=${currentPage}&pageSize=${pageSize}`,
    method: 'post',
    data: params,
    withCredential: true,
  })
}

export async function saveRole (params) {
  return request({
    url: `${serviceDomain}/sys/role/saveRole`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteRole (params) {
  return request({
    url: `${serviceDomain}/sys/role/deleteRole?roleId=${params}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getRole (params) {
  return request({
    url: `${serviceDomain}/role/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}

export async function getRolePrivileges (params) {
  console.log(params)
  return request({
    url:  `${serviceDomain}/sys/role/getRolePrivileges?roleId=${params}`,
    method: 'get',
    withCredential: true,
  })
}
