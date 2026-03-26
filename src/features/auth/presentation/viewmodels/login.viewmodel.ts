import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authContainer } from '@/src/core/di/auth.container'
import { LoginRequest } from '../../domain/dtos/request/login.request'
import { Routes } from '@/src/core/navigator/routes'

export const useLoginViewModel = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      await authContainer.loginUseCase.execute(credentials)
      router.push(Routes.landing)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}