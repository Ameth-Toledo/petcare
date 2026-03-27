import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authContainer } from '@/src/core/di/auth.container'
import { LoginRequest } from '../../domain/dtos/request/login.request'
import { Routes } from '@/src/core/navigator/routes'
import { Role } from '../../domain/entities/role.entity'

export const useLoginViewModel = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await authContainer.loginUseCase.execute(credentials)

      switch (response.user.rol) {
        case Role.ADMIN:
          router.push(Routes.dashboard.admin.overview)
          break
        case Role.VETERINARIO:
          router.push(Routes.dashboard.veterinario.overview)
          break
        case Role.USER:
          router.push(Routes.dashboard.cliente.overview)
          break
        default:
          router.push(Routes.landing)
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}