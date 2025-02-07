import { useI18n } from 'vue-i18n'
import styles from './index.module.scss'
import type { App } from 'vue'

const Workbench = defineComponent({
  name: 'Workbench',
  setup() {
    const { t } = useI18n()
    return () => {
      return <div className={styles.wrapper}>{t('message')}</div>
    }
  }
})

Workbench.install = function (app: App) {
  app.component(Workbench.name!, Workbench)
  return app
}

export default Workbench
