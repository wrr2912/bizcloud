import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getDepartmentTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage : 1
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/department/getPageable?pageNumber=${currentPage}&pageSize=${pageSize}`
  if (params.txtDepartmentName) {
    url += `&departmentname=${params.txtDepartmentName}`
  }

  return request({
    url,
    method: 'GET',
    withCredential: true,
  })
}

export async function createDepartment (params) {
  return request({
    url: `${serviceDomain}/department/add`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function updateDepartment (params) {
  return request({
    url: `${serviceDomain}/department/update`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteDepartment (params) {
  return request({
    url: `${serviceDomain}/department/delete?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getDepartment (params) {
  return request({
    url: `${serviceDomain}/department/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
