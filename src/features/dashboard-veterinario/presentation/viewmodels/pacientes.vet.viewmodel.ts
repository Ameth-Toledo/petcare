import { useState, useEffect } from 'react'
import { pacientesVetService } from '../../infrastructure/services/pacientes.vet.service'
import { citasVetService } from '../../infrastructure/services/citas.vet.service'
import { GetPacientesVetUseCase } from '../../domain/usecases/get-pacientes-vet.usecase'
import { PacienteVet } from '../../domain/entities/paciente.vet.entity'
import { getUsuarioLocal } from '@/src/core/lib/auth/get-usuario-local'

const getPacientesUseCase = new GetPacientesVetUseCase(pacientesVetService)

export const usePacientesVetViewModel = () => {
  const [pacientes, setPacientes] = useState<PacienteVet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        setIsLoading(true)

        const usuario = getUsuarioLocal()
        if (!usuario) throw new Error('No hay sesión activa')

        // Traer todas las citas y quedarnos con los id_mascota del vet logueado
        const todasLasCitas = await citasVetService.getCitas()
        const citasDelVet   = todasLasCitas.filter(c => c.id_veterinario === usuario.id)

        // Set de ids de mascotas únicas que atendió este vet
        const idsMascotasDelVet = new Set(citasDelVet.map(c => c.id_mascota))

        // Traer todos los pacientes y filtrar solo los del vet
        const todos = await getPacientesUseCase.execute()
        const solosDelVet = todos.filter(p => idsMascotasDelVet.has(p.id))

        setPacientes(solosDelVet)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPacientes()
  }, [])

  return { pacientes, isLoading, error }
}