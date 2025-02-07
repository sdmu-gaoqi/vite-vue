import request from './request'
import type { CommonResponse } from './type'

export const getPerms = () => {
  return request
    .request<CommonResponse<string[]>>({
      url: '/api/perm',
      method: 'get'
    })
    .catch(() => {
      return Promise.resolve({
        code: 0,
        data: ['perm-1']
      })
    })
}
