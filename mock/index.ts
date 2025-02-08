import type { MockMethod } from 'vite-plugin-mock'

// @ts-ignore
const testMock: MockMethod = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    response: () => {
      return {
        code: 0,
        data: {
          token: 'thisIsToken'
        }
      }
    }
  },
  {
    url: '/api/perm',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 0,
        data: ['perm-1']
      }
    }
  },
  {
    url: '/api/logout',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 0
      }
    }
  }
]

export default testMock
