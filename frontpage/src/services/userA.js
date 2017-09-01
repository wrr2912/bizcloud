import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getUserTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage : 1
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/user/getPageable?pageNumber=${currentPage}&pageSize=${pageSize}`
  if (params.txtUserName) {
    url += `&username=${params.txtUserName}`
  }

  return request({
    url,
    method: 'GET',
    withCredential: true,
  })
}

export async function createUser (params) {
  return request({
    url: `${serviceDomain}/user/add`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function updateUser (params) {
  return request({
    url: `${serviceDomain}/user/update`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteUser (params) {
  return request({
    url: `${serviceDomain}/user/delete?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getUserDetail (params) {
  return request({
    url: `${serviceDomain}/user/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
