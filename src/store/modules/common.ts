import type { MenuItem } from '@/types'
import { routes2Menus } from '@/utils/menu'
import { defineStore } from 'pinia'

const useCommonStore = defineStore('common', () => {
  const menus = ref<MenuItem[]>([])
  const userInfo = ref({})
  const perms = ref<string[]>(['1'])

  const savePerms = (data: string[]) => {
    perms.value = data
    const menu = routes2Menus(data)
    changeMenus(menu)
  }

  const changeMenus = (data: MenuItem[]) => {
    menus.value = data
  }

  const changeUser = (data: typeof userInfo) => {
    userInfo.value = data
  }

  return {
    menus,
    userInfo,
    perms,
    changeMenus,
    changeUser,
    savePerms
  }
})

export default useCommonStore
