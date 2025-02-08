import { logoutService } from '@/services/user'
import { local } from './storage'
import { loginToken } from '@/constant/auth'

export const isLogin = () => {
  return !!local.baseGet(loginToken)
}

export const logout = () => {
  local.remove(loginToken)
}

export const systemLogin = (token: string) => {
  local.baseSet(loginToken, token)
}

export const systemLogout = async () => {
  await logoutService()
  local.remove(loginToken)
  location.reload()
}
