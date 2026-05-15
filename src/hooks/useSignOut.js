import { useWizard } from './useWizard'
import { signOut as supabaseSignOut } from '../services/authService'

export function useSignOut() {
  const { reset } = useWizard()
  return async () => {
    reset()
    await supabaseSignOut()
  }
}
