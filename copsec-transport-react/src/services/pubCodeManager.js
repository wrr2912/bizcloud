/**
 * Created by huangzy on 2017/5/18.
 */
import { request, config } from '../utils'
const { api } = config
const {  } = api
import { serviceDomain, defaultPageSize } from '../utils/config'

export async function findCodeTree (params) {
  return request({
    url: `${serviceDomain}/pubCode/getChildCodeTree`,
    method: 'GET',
    data: params,
    withCredential: true,
  }).then(function (data) {
    if(data.success) {
      return data.result.rows;
    }else {
      return [];
    }
  })
}

export async function getCodeList (params) {
  let currentPage = params.currentPage ? params.currentPage - 1 : 0
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize
  return request({
    url: `${serviceDomain}/pubCode/getCodeList?currentPage=${currentPage}&pageSize=${pageSize}`,
    method: 'post',
    data: params.queryData,
    withCredential: true,
  })
}

export async function getPubCodes (params) {
  return request({
    url: `${serviceDomain}/pubCode/findCodeByCodeTypes?pubCodes=${params.pubCodes}`,
    method: 'GET',
    withCredential: true,
  })
}

export async function saveCode (params) {
  return request({
    url: `${serviceDomain}/pubCode/addCode`,
    method: 'post',
    data: params.data,
    withCredential: true,
  })
}

export async function getCodeInfo (params) {
  return request({
    url: `${serviceDomain}/pubCode/getCodeById?codeId=${params.codeId}`,
    method: 'GET',
    withCredential: true,
  })
}

export async function deleteCode (params) {
  return request({
    url: `${serviceDomain}/pubCode/delCodeById?codeId=${params.codeId}`,
    method: 'GET',
    withCredential: true,
  })
}


