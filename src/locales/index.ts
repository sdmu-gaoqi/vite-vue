import zhCN from './zh-CN'
import en from './en'
import { createI18n } from 'vue-i18n'
import type { Lang } from '@/types'
import { local } from '@/utils/storage'

const getInitLang = (): Lang => {
  return local.baseGet('lang') || 'zh-CN'
}

export const setupI18n = createI18n({
  legacy: false,
  locale: getInitLang(),
  globalInjection: true,
  messages: {
    'zh-CN': zhCN,
    en
  }
})
