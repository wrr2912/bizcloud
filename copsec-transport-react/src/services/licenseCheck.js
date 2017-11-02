import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getDocTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/license/apply/getpage?pageNumber=${currentPage}&pageSize=${pageSize}`

  return request({
    url,
    method: 'GET',
    withCredential: true,
  })
}

export async function createLicense (params) {
  return request({
    url: `${serviceDomain}/license/add`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function matchToUser (params) {
  return request({
    url: `${serviceDomain}/license/apply/handleMatchToUser`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}
export async function acceptTask (params) {
  return request({
    url: `${serviceDomain}/license/apply/acceptTask?id=${params.id}`,
    method: 'PUT',
    withCredential: true,
  })
}
export async function backTask (params) {
  return request({
    url: `${serviceDomain}/license/apply/backTask?id=${params.id}`,
    method: 'PUT',
    withCredential: true,
  })
}
export async function deleteLicense (params) {
  return request({
    url: `${serviceDomain}/license/delete?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}
export async function getCompleteUser(params){

  return request({
    url: `${serviceDomain}/sys/user/getUserList`,
    method: 'POST',
    data: params,
    headers: {'Content-Type':'application/json'},
    withCredential: true,
  })
}
export async function getLicense (params) {
  return request({
    url: `${serviceDomain}/license/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
