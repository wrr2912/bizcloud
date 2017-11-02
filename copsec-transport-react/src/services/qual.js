import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getQualTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize
  return request({
    url: `${serviceDomain}/out/qualification/findbycompanyid?pageNumber=${currentPage}&pageSize=${pageSize}`,
    method: 'get',
    data: params,
    withCredential: true,
  })
}

export async function saveQual (params) {
  return request({
    url: `${serviceDomain}/sys/company/saveCompany`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteQual (params) {
  return request({
    url: `${serviceDomain}/sys/company/deleteCompany?companyId=${params}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getQual (params) {
  return request({
    url: `${serviceDomain}/company/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
