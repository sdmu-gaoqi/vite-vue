import type { RouteRecordRaw } from 'vue-router'

export type RouteItem = Omit<RouteRecordRaw, 'children'> & {
  name: string
  meta?: {
    access?: string // 权限标识
    key?: string // 唯一标识
    notNeedLogin?: boolean // 是否需要登录
    icon?: string
  }
  children?: RouteItem[]
}

export type MenuItem = {
  title: string
  key: string
  path: string
  icon?: string
  children?: {
    title: string
    path: string
    key: string
  }[]
}

export type Env = 'development' | 'test' | 'staging' | 'production'

export type Lang = 'zh-CN' | 'en'
