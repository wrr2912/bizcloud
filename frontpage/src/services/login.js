import { request, config } from '../utils'
const { api } = config
const { userLogin } = api

export async function login (data) {
 /* return request({
    url: userLogin,
    method: 'post',
    data,
  })*/
  return request({
    url:userLogin+"?userName=admin&password=admin",
    method: 'GET',
    withCredential: true,
  })
}
