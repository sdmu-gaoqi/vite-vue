import { Env } from '@/types'

export const adminPerm = '*:*:*'

export const mode = import.meta.env.MODE as unknown as Env
export const env = import.meta.env

export const langMap = [
  {
    label: '中文',
    value: 'zh-CN'
  },
  {
    label: 'english',
    value: 'en'
  }
]
