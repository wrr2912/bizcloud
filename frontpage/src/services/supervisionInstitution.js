import { request, config } from '../utils'

const { serviceDomain, defaultPageSize } = config

export async function getSupervisionInstitutionTableDataSource (params) {
  let currentPage = params.currentPage ? params.currentPage : 1
  let pageSize = params.pageSize ? params.pageSize : defaultPageSize

  let url = `${serviceDomain}/supervisionInstitution/getPageable?pageNumber=${currentPage}&pageSize=${pageSize}`
  if (params.txtUnitName) {
    url += `&unitName=${params.txtUnitName}`
  }
  if (params.txtSupervision) {
    url += `&supervision=${params.txtSupervision}`
  }
  if (params.txtPrefectureSupervision) {
    url += `&prefectureSupervision=${params.txtPrefectureSupervision}`
  }
  if (params.txtQualitySupervision) {
    url += `&qualitySupervision=${params.txtQualitySupervision}`
  }
  if (params.txtQualitySupervisionArea) {
    url += `&qualitySupervisionArea=${params.txtQualitySupervisionArea}`
  }
  /*supervision: null,             //铁路总公司监督机构、
	  prefectureSupervision: null,   //地区政府监管部门
		qualitySupervision: null,      //质量监督机构
		qualitySupervisionArea: null,  //监督机构所属地域*/
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
    url: `${serviceDomain}/supervisionInstitution/delete?id=${params.id}`,
    method: 'DELETE',
    withCredential: true,
  })
}

export async function getSupervisionInstitution (params) {
  return request({
    url: `${serviceDomain}/supervisionInstitution/get?id=${params.id}`,
    method: 'GET',
    withCredential: true,
  })
}
