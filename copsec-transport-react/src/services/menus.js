import { request, config } from '../utils'
const { serviceDomain, api } = config
const { info_menus, save_menus } = api

export async function getMgrMenus (params) {
  return request({
    url: `${serviceDomain}/sys/menu/findMenuTreeTable`,
    method: 'get',
    withCredential: true,
  })
}

export async function getMenuDrop (params) {
  return request({
    url: `${serviceDomain}/sys/menu/findMenuTreeDrop`,
    method: 'get',
    withCredential: true,
  })
}
export async function getMgrMenuInfo (params) {
  return request({
    url: info_menus,
    method: 'get',
    data: params,
    withCredential: true,
  })
}

export async function saveMgrMenuInfo (params) {
    return request({
      url: `${serviceDomain}/sys/menu/saveMenu`,
      method: 'POST',
      data: params,
      withCredential: true,
    })
}
