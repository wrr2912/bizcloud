import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getPersonnelTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage : 1
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/personnel/getPageable?pageNumber=${currentPage}&pageSize=${pageSize}`
  if (params.txtPersonnelName) {
    url += `&personnelName=${params.txtPersonnelName}`
  }

  return request({
    url,
    method: 'GET',
    withCredential: true,
  })
}

export async function createPersonnel (params) {
  return request({
    url: `${serviceDomain}/personnel/add`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function updatePersonnel (params) {
  return request({
    url: `${serviceDomain}/personnel/update`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deletePersonnel (params) {
  return request({
    url: `${serviceDomain}/personnel/delete?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getPersonnel (params) {
  return request({
    url: `${serviceDomain}/personnel/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
