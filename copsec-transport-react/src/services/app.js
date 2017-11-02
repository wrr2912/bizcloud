import { request, config } from '../utils'

const { api, serviceDomain } = config
const { menus, user, userLogout, userLogin } = api

export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: user.replace('/:id', ''),
    //url: `${serviceDomain}/sys/getUserInfo`,
    method: 'get',
    data: params,
    withCredential: true,
  }).then((userData) => {

    if (userData.success && userData.result) {
      userData.user = userData.result
    }
    return userData
  })
}

export async function getCustomMenus () {
  return request({
    url: `${serviceDomain}/sys/menu/findMenuTree`,
    method: 'GET',
    withCredential: true,
    headers: { 'x-forward-menu-id': 1 },
  })
}
export async function getMenus () {
  return request({
    url: menus ,
    method: 'GET',
    withCredential: true,
  })
}
