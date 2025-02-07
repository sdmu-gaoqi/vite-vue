import { adminPerm } from '@/constant'
import route, { layoutRoutes } from '@/route'
import type { MenuItem } from '@/types'

export const transformRoute = (perm: string[]) => {
  const isAdmin = perm.includes(adminPerm)
  const permMap = Object.fromEntries(
    perm.map((item) => {
      return [item, true]
    })
  )
  if (isAdmin) {
    return route.getRoutes()
  }
  const allRoutes = route.getRoutes()

  allRoutes.forEach((item) => {
    const access = item?.meta?.access as string
    if (access) {
      const hasPerm = permMap?.[access] || !access

      if (!hasPerm) {
        route.removeRoute(item?.name as string)
      }
    }
  })
  return route.getRoutes()
}

export const routes2Menus = (perm: string[]) => {
  const isAdmin = perm.includes(adminPerm)
  const permMap = Object.fromEntries(
    perm.map((item) => {
      return [item, true]
    })
  )

  /**
   * @desc 根据权限转换路由到菜单
   * 1. 递归遍历
   * 2. 第一级是否设置权限、后续的 children都继续处理,并且忽略第一层有children的access
   * */
  const recurseRouter = (route = layoutRoutes, parentPath = '') => {
    const menuItems: MenuItem[] = []

    route.forEach((item) => {
      const { meta = {}, name = '', path: itemPath, children = [] } = item
      const access = meta?.access
      const icon = meta?.icon
      const hideInMenu = meta?.hideInMenu
      const hasPerm = isAdmin || !access || (access && permMap?.[access])

      if (hideInMenu) {
        return
      }

      if (hasPerm) {
        const path = parentPath ? `${parentPath}/${itemPath}` : itemPath
        menuItems.push({
          title: name,
          key: path,
          path,
          icon,
          children: recurseRouter(children, path)
        })
      }
    })
    return menuItems
  }

  return recurseRouter()
}
