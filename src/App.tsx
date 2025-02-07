import { ConfigProvider, StyleProvider } from 'ant-design-vue'
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const App = defineComponent({
  setup() {
    onMounted(() => {
      // @ts-ignore
      zhCN.DatePicker.lang = {
        ...zhCN.DatePicker?.lang,
        monthFormat: 'M月',
        shortWeekDays: ['日', '一', '二', '三', '四', '五', '六']
      }
    })

    return () => {
      return (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#6102fd',
              colorTextBase: '#6a6d82',
              colorBgBase: '#fff'
            }
          }}
        >
          <StyleProvider hashPriority="high">
            <RouterView />
          </StyleProvider>
        </ConfigProvider>
      )
    }
  }
})

export default App
