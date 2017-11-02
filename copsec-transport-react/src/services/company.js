import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getCompanyTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize
  console.log(params)
  return request({
    url: `${serviceDomain}/out/company/getpage?pageNumber=${currentPage}&pageSize=${pageSize}`,
    method: 'post',
    data: params,
    withCredential: true,
  })
}

export async function saveCompany (params) {
  return request({
    url: `${serviceDomain}/sys/company/saveCompany`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteCompany (params) {
  return request({
    url: `${serviceDomain}/sys/company/deleteCompany?companyId=${params}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getCompany (params) {
  return request({
    url: `${serviceDomain}/company/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
