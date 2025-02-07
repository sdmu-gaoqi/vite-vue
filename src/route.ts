import { createRouter, createWebHistory } from 'vue-router'
import Layout from './components/layout/layout.vue'
import { isLogin } from './utils'
import type { RouteItem } from './types'
import Workbench from '@/assets/svg/工作台.svg'
import Perm from '@/assets/svg/员工.svg'

export const layoutRoutes: RouteItem[] = [
  {
    path: 'workbench',
    name: 'menu.workbench',
    component: () => import('./pages/workbench'),
    meta: {
      icon: Workbench
    }
  },
  {
    path: '/catalogue',
    name: 'menu.catalogue',
    redirect: () => {
      return { path: '1' }
    },
    children: [
      {
        path: 'perm',
        name: 'menu.catalogue.perm',
        component: () => import('./pages/perm/index-1'),
        meta: {
          access: 'perm-1',
          icon: Perm
        }
      },
      {
        path: 'perm/edit',
        name: 'menu.catalogue.perm.edit',
        component: () => import('./pages/perm/index-1'),
        meta: {
          access: 'perm-1',
          hideInMenu: true
        }
      },
      {
        path: 'no-perm-set',
        name: 'menu.catalogue.no-perm-set',
        component: () => import('./pages/perm/index-2')
      }
    ]
  },
  {
    path: '/menu/perm',
    name: 'menu.perm',
    component: () => import('./pages/perm/index-2'),
    meta: {
      access: 'perm-1'
    }
  },
  {
    path: '/menu/no-perm-set',
    component: () => import('./pages/perm/index-2'),
    name: 'menu.no-perm-set'
  }
]

const route = createRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login'),
      meta: {
        notLogin: true
      }
    },
    {
      path: '',
      component: Layout,
      name: '',
      redirect: () => {
        return { path: '/workbench' }
      },
      children: layoutRoutes
    },
    {
      path: '/403',
      name: '403',
      component: () => import('./pages/403/index.vue'),
      meta: {
        notLogin: true
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./pages/404/index.vue'),
      meta: {
        notLogin: true
      }
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ],
  history: createWebHistory()
})

route.beforeEach(async (to, from, next) => {
  const { notNeedLogin } = to.meta || {}
  const loged = isLogin()

  if (notNeedLogin) {
    next()
    return
  }

  if (!loged) {
    next('/login')
    return
  }

  next()
})

export default route
