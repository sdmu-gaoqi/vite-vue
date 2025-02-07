import request from './request'
import type { CommonResponse } from './type'

export const loginService = () => {
  return request
    .request<
      CommonResponse<{
        token: string
      }>
    >({
      url: '/api/login',
      method: 'post'
    })
    .catch(() => {
      return Promise.resolve({
        code: 0,
        data: {
          token: 'thisIsToken'
        }
      })
    })
}

export const logoutService = () => {
  return request
    .request({
      url: '/api/logout',
      method: 'get'
    })
    .catch(() => {
      return Promise.resolve({
        code: 0
      })
    })
}
