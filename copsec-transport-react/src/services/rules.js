import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getRulesTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage-1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/review/Rules/getpage?pageNumber=${currentPage}&pageSize=${pageSize}`

  if (params.txtRulesName) {
    url += `&messType=${params.txtRulesName}`
  }

  return request({
    url,
    method: 'GET',
    withCredential: true,
  })
}

export async function createRules (params) {
  return request({
    url: `${serviceDomain}/rules/saveRules`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function saveRules (params) {
  return request({
    url: `${serviceDomain}/review/Rules/updateRules`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function getRulesByType (params) {
  return request({
    url: `${serviceDomain}/review/Rules/getRulesByType`,
    method: 'GET',
    withCredential: true,
  })
}
export async function setRules (params) {
  return request({
    url: `${serviceDomain}/review/Rules/updateRules`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}
export async function deleteRules (params) {
  return request({
    url: `${serviceDomain}/review/Rules/deleteRules?id=${params}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getRules (params) {
  return request({
    url: `${serviceDomain}/review/Rules/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
