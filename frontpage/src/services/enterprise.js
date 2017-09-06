import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getEnterpriseTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage : 1
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/enterprise/getPageable?pageNumber=${currentPage}&pageSize=${pageSize}`
  if (params.txtEnterpriseName) {
    url += `&enterprisename=${params.txtEnterpriseName}`
  }

  return request({
    url,
    method: 'GET',
    withCredential: true,
  })
}

export async function createEnterprise (params) {
  return request({
    url: `${serviceDomain}/enterprise/add`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function updateEnterprise (params) {
  return request({
    url: `${serviceDomain}/enterprise/update`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteEnterprise (params) {
  return request({
    url: `${serviceDomain}/enterprise/delete?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getEnterprise (params) {
  return request({
    url: `${serviceDomain}/enterprise/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
