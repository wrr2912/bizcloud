import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getCheckListTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/license/accepted/getpage?pageSize=${pageSize}&pageNumber=${currentPage}`

  return request({
    url,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}
// //保存材料的审查意见
// export async function saveAdvice (params) {
//   return request({
//     url: `${serviceDomain}/review/material/saveadvice`,
//     data: params,
//     method: 'POST',
//     withCredential: true,
//   })
// }
export async function saveCheckList (params) {
  return request({
    url: `${serviceDomain}/reviewlist/addone`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}
export async function getdocs (params) {
  return request({
    url: `${serviceDomain}/review/material/getdocs?id=`+params,
    method: 'GET',
    withCredential: true,
  })
}
//保存材料的审查意见
export async function getAdvice (params) {
  return request({
    url: `${serviceDomain}/pretrial/preadvice/getpage`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}
//保存材料的审查意见
export async function saveAdvice (params) {
  return request({
    url: `${serviceDomain}/pretrial/preadvice/addone`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}
export async function getMaterialList (params) {
  return request({
    url: `${serviceDomain}/review/material/getprematerial?id=`+params,
    method: 'GET',
    withCredential: true,
  })
}
export async function getMaterial (params) {
  return request({
    url: `${serviceDomain}/review/material/getall?id=`+params,
    method: 'GET',
    withCredential: true,
  })
}

export async function getAdviceList (params) {
  return request({
    url: `${serviceDomain}/review/material/getall?id=`+params,
    method: 'GET',
    withCredential: true,
  })
}
