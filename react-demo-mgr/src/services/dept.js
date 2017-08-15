import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getDeptTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage : 1
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/dept/getPageable?pageNumber=${currentPage}&pageSize=${pageSize}`
  if (params.txtDeptName) {
    url += `&deptname=${params.txtDeptName}`
  }

  return request({
    url,
    method: 'GET',
    withCredential: true,
  })
}

export async function createDept (params) {
  return request({
    url: `${serviceDomain}/dept/add`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function updateDept (params) {
  return request({
    url: `${serviceDomain}/dept/update`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteDept (params) {
  return request({
    url: `${serviceDomain}/dept/delete?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getDept (params) {
  return request({
    url: `${serviceDomain}/dept/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
