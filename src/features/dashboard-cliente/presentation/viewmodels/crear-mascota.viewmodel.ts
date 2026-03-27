import { useState } from 'react'
import { dashboardClienteService } from '../../infrastructure/services/dashboard.service'
import { CreateMascotaUseCase } from '../../domain/usecases/create-mascota.usecase'
import { CreateMascotaRequest } from '../../domain/dtos/request/create-mascota.request'

const createMascotaUseCase = new CreateMascotaUseCase(dashboardClienteService)

export const useCrearMascotaViewModel = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const crearMascota = async (data: CreateMascotaRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      await createMascotaUseCase.execute(data)
      onSuccess()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { crearMascota, isLoading, error }
}