import { adminPerm } from '@/constant'
import { useCommonStore } from '@/store'

const useAccess = () => {
  const commonStore = useCommonStore()
  const perms = commonStore.perms
  return {
    view: perms.includes('view') || perms.includes(adminPerm)
  }
}

export default useAccess
