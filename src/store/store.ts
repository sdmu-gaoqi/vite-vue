import type { Store } from 'vuex'
import { createStore, useStore as baseUseStore } from 'vuex'
import type { CommonState } from './modules/common'
import common from './modules/common'

export const key: InjectionKey<
  Store<{
    common: CommonState
  }>
> = Symbol()

// 创建一个新的 store 实例
export const store = createStore<{
  common: CommonState
}>({
  modules: {
    common
  }
})

/**
 * 这里本应该返回State的所有类型,暂用unknown代替
 * @returns Store<State>
 */
export function useStore(): Store<{
  common: CommonState
}> {
  return baseUseStore(key)
}
