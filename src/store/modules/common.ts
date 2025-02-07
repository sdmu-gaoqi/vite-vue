import type { MenuItem } from '@/types'
import { CHANGEMENUDATA, SETPERMS, SETUSERINFO } from '../actions'
import { getPerms } from '@/services/common'

export interface CommonState {
  menus: MenuItem[]
  userInfo: Record<string, any>
  perms: string[] | undefined
}

const permissions = await getPerms()
const state: CommonState = {
  menus: [],
  userInfo: {},
  perms: permissions.data
}

const getters = {
  menus(state: CommonState) {
    return state.menus
  }
}

const actions = {
  changeMenus(
    { state, commit }: any,
    payload: { type: string; data: typeof state.menus }
  ) {
    commit(CHANGEMENUDATA, payload.data)
  },
  changeUser(
    { state, commit }: any,
    payload: { type: string; data: typeof state.userInfo }
  ) {
    commit(SETUSERINFO, payload.data)
  },
  setPerms({ commit }: any, payload: { type: string; data: string[] }) {
    commit(SETPERMS, payload.data)
  }
}

const mutations = {
  [CHANGEMENUDATA](state: CommonState, data: MenuItem[]) {
    state.menus = data
  },
  [SETUSERINFO](state: CommonState, data: typeof state.userInfo) {
    state.userInfo = data
  },
  [SETPERMS](state: CommonState, data: CommonState['perms']) {
    state.perms = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
