import request from './request'
import { CommonResponse } from './type'

export const loginService = () => {
  return request.request<
    CommonResponse<{
      token: string
    }>
  >({
    url: '/api/login',
    method: 'post'
  })
}
