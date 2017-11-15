import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getDocHtml (params) {
  return request({
    url: `${serviceDomain}/license/docdomain/filedisplay?id=`+params,
    method: 'GET',
    withCredential: true,
  })
}

export async function getFiles (params) {
  return request({
    url: `${serviceDomain}/review/material/getdocs?id=`+params,
    method: 'GET',
    withCredential: true,
  })
}

export async function getMaterials (params) {
  return request({
    url: `${serviceDomain}/review/material/getmaterial?id=`+params,
    method: 'GET',
    withCredential: true,
  })
}
