import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getCheckListTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/reviewlist/getpage?pageSize=${pageSize}&pageNumber=${currentPage}`

  return request({
    url,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function saveCheckList (params) {
  return request({
    url: `${serviceDomain}/reviewlist/addone`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}
export async function getAdviceList (params) {
  return request({
    url: `${serviceDomain}/transport/reviewadvice/list?applyid=`+params,
    method: 'GET',
    withCredential: true,
  })
}
