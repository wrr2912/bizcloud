import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getMinutesTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/license/meetingrecord/getpage?pageSize=${pageSize}&pageNumber=${currentPage}`

  return request({
    url,
    data: params,
    method: 'GET',
    withCredential: true,
  })
}

export async function getApplyByState (params) {
  return request({
    url: `${serviceDomain}/license/apply/getApplyByState`,
    method: 'GET',
    withCredential: true,
  })
}

export async function createMinutes (params) {
  return request({
    url: `${serviceDomain}/license/meetingrecord/saveRecord`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function updateMinutes (params) {
  return request({
    url: `${serviceDomain}/license/meetingrecord/updateRecord`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteMinutes (params) {
  return request({
    url: `${serviceDomain}/license/meetingrecord/deleteRecord?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}
