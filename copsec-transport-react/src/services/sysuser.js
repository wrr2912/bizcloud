import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getUserTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize
  console.log(params)
  return request({
    url: `${serviceDomain}/sys/user/findUserList?pageNumber=${currentPage}&pageSize=${pageSize}`,
    method: 'post',
    data: params,
    withCredential: true,
  })
}

export async function saveUser (params) {
  return request({
    url: `${serviceDomain}/sys/user/saveUser`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteUser (params) {
  return request({
    url: `${serviceDomain}/sys/user/deleteUser?userId=${params}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getUser (params) {
  return request({
    url: `${serviceDomain}/user/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
