const usePerformance = () => {
  const data = reactive({ pageStart: 0, pageEnd: 0, pageRendered: 0 })
  onBeforeMount(() => {
    const pageStart = performance.now()
    data.pageStart = pageStart
  })
  onMounted(() => {
    const pageEnd = performance.now()
    data.pageEnd = pageEnd
    data.pageRendered = pageEnd - data.pageStart
  })
  return data
}

export default usePerformance
