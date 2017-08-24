import { request, config } from '../utils'
const { api } = config
const { userLogin } = api

export async function login (data) {
 return request({
    url: `${userLogin}?userName=${data.userName}&password=${data.password}`,
    method: "GET",
    withCredential: true,
  });
}
