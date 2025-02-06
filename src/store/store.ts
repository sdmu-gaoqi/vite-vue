import { Store, createStore, useStore as baseUseStore } from 'vuex'
import common, { CommonState } from './modules/common'
import { InjectionKey } from 'vue'

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
