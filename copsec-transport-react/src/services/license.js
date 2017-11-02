import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getLicenseTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize
    console.log('-----------查询-------------------')
    console.log(params)
  let url = `${serviceDomain}/license/apply/getpage?pageNumber=${currentPage}&pageSize=${pageSize}`

  return request({
    url,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function createLicense (params) {
  return request({
    url: `${serviceDomain}/license/add`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}
//保存司审查的审查意见
export async function chiefsCheck (params) {
  return request({
    url: `${serviceDomain}/license/branchchief/updatePassInfo`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}
//保存处审查的审查意见
export async function directorCheck (params) {
  return request({
    url: `${serviceDomain}/license/director/updateapply`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}
//保存材料的审查意见
export async function saveAdvice (params) {
  return request({
    url: `${serviceDomain}/review/material/saveadvice`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}

export async function saveApply (params) {
  return request({
    url: `${serviceDomain}/license/operator/updateapply`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}

//保存返回集体审查结果
export async function saveCollectCheck (params) {
  return request({
    url: `${serviceDomain}/license/chiefs/updatePassInfo`,
    data: params,
    method: 'PUT',
    withCredential: true,
  })
}
//保存返回证书内容
export async function saveIssue (params) {
  return request({
    url: `${serviceDomain}/license/feedback/savefeedback`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}
export async function getMaterialList (params) {
  return request({
    url: `${serviceDomain}/review/material/getmaterial?id=`+params,
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
export async function matchToUser (params) {
  return request({
    url: `${serviceDomain}/license/apply/handleMatchToUser`,
    data: params,
    method: 'POST',
    withCredential: true,
  })
}
export async function acceptTask (params) {
  return request({
    url: `${serviceDomain}/license/apply/accepttask?id=${params}`,
    method: 'PUT',
    withCredential: true,
  })
}
export async function backTask (params) {
  return request({
    url: `${serviceDomain}/license/apply/backtask?id=${params.id}`,
    method: 'PUT',
    withCredential: true,
  })
}
export async function deleteLicense (params) {
  return request({
    url: `${serviceDomain}/license/delete?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}
export async function getCompleteUser(params){

  return request({
    url: `${serviceDomain}/sys/user/getUserList`,
    method: 'POST',
    data: params,
    headers: {'Content-Type':'application/json'},
    withCredential: true,
  })
}
export async function getLicense (params) {
  return request({
    url: `${serviceDomain}/license/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
export async function showCompany (params) {
  return request({
    url: `${serviceDomain}/out/company/findone`,
    data:params,
    method: 'POST',
    withCredential: true,
  })
}
