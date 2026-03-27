import { useState } from 'react'
import { dashboardClienteService } from '../../infrastructure/services/dashboard.service'
import { CreateCitaUseCase } from '../../domain/usecases/create-cita.usecase'
import { CreateCitaRequest } from '../../domain/dtos/request/create-cita.request'

const createCitaUseCase = new CreateCitaUseCase(dashboardClienteService)

export const useCrearCitaViewModel = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const crearCita = async (data: CreateCitaRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      await createCitaUseCase.execute(data)
      onSuccess()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { crearCita, isLoading, error }
}