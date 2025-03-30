import { useQuery } from 'react-query'
import { authService } from '@/services/auth'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  const { data: user, isLoading } = useQuery('user', authService.me, {
    retry: false,
    onError: () => {
      authService.logout()
    },
  })

  const logout = () => {
    authService.logout()
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  }
} 