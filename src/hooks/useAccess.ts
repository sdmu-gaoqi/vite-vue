import { adminPerm } from '@/constant'
import { useStore } from 'vuex'

const useAccess = () => {
  const store = useStore()
  const perms = store?.state?.common?.perms
  return {
    view: perms.includes('view') || perms.includes(adminPerm)
  }
}

export default useAccess
