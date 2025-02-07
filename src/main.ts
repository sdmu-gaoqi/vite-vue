import './style.css'
import App from './App'
import route from './route'
import Antd from 'ant-design-vue'
import './styles/global.scss'
import './styles/tailwind.global.scss'
import { setupI18n } from './locales'
import { routes2Menus, transformRoute } from './utils/menu'
import { store, key } from './store/store'

document.title = ''
const { state } = store
const perm = toRaw(state.common.perms)

// 根据权限操作route
transformRoute(perm || [])
// 根据权限处理menu
const menu = routes2Menus(store.state.common.perms || [])

store.dispatch('common/changeMenus', { data: menu })

createApp(App).use(setupI18n).use(Antd).use(route).use(store, key).mount('#app')
