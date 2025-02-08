import './style.css'
import App from './App'
import route from './route'
import Antd from 'ant-design-vue'
import './styles/global.scss'
import './styles/tailwind.global.scss'
import { setupI18n } from './locales'
import { transformRoute } from './utils/menu'
import { createPinia } from 'pinia'
import { useCommonStore } from './store'
import { getPerms } from './services/common'

const pinia = createPinia()

document.title = ''

const initPerms = async () => {
  const res = await getPerms().catch(() => {
    return { data: [] }
  })
  transformRoute(res.data || [])
  return res.data
}

const perms = await initPerms()

createApp(App)
  .use(setupI18n)
  .use(Antd)
  .use(pinia)
  .use(async () => {
    const commonStore = useCommonStore()
    commonStore.savePerms(perms)
  })
  .use(route)
  .mount('#app')
