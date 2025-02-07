export type CodeType =
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Space'
  | 'NumpadEnter'
  | string

const useListenKeycode = (
  el: HTMLElement,
  data: Map<CodeType[], (e: KeyboardEvent & { code: CodeType }) => void>
) => {
  const fn = (e: KeyboardEvent) => {
    data.forEach((todo, key) => {
      if (key?.includes(e.code)) {
        todo && todo(e)
      }
    })
  }
  const run = () => {
    if (!el) {
      return
    }
    el.addEventListener('keydown', fn)
  }
  onUnmounted(() => {
    el.removeEventListener('keydown', fn)
  })
  return [run]
}

export default useListenKeycode
