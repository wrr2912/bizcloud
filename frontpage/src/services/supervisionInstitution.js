import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getSupervisionInstitutionTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage : 1
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/supervisionInstitution/getPageable?pageNumber=${currentPage}&pageSize=${pageSize}`
  if (params.txtUnitName) {
    url += `&unitname=${params.txtUnitName}`
  }

  return request({
    url,
    method: 'GET',
    withCredential: true,
  })
}

export async function createSupervisionInstitution (params) {
  return request({
    url: `${serviceDomain}/supervisionInstitution/add`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function updateSupervisionInstitution (params) {
  return request({
    url: `${serviceDomain}/supervisionInstitution/update`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteSupervisionInstitution (params) {
  return request({
    url: `${serviceDomain}/supervisionInstitution/delete?SIID=${params.SIId}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getSupervisionInstitution (params) {
  return request({
    url: `${serviceDomain}/supervisionInstitution/get?SIId=${params.SIId}`,
    method: 'GET',
    withCredential: true,
  })
}
