import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authContainer } from '@/src/core/di/auth.container'
import { RegisterRequest } from '../../domain/dtos/request/register.request'
import { Routes } from '@/src/core/navigator/routes'

export const useRegisterViewModel = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      await authContainer.registerUseCase.execute(data)
      router.push(Routes.auth.login)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isLoading, error }
}