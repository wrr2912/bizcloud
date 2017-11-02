import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getCompLedgerTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/basicinfor/getpage?pageSize=${pageSize}&pageNumber=${currentPage}`

  // if (params.txtCompanyName) {
  //   url += `&companyName=${params.txtCompanyName}`
  // }

  if(params.txtCompanyName){
    params.companyName=params.txtCompanyName
  }

  return request({
    url,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function createCompLedger (params) {
  return request({
    url: `${serviceDomain}/basicinfor/saveRules`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function updateCompLedger (params) {
  return request({
    url: `${serviceDomain}/llicense/meetingrecord/updateRecord`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

export async function deleteCompLedger (params) {
  return request({
    url: `${serviceDomain}/llicense/meetingrecord/deleteRecord?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}
