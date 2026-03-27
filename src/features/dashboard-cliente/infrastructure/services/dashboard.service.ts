import { httpClient } from '@/src/core/lib/http/http-client'
import { Cita } from '../../domain/entities/cita.entity'
import { Mascota } from '../../domain/entities/mascota.entity'

export const dashboardClienteService = {
  getCitasRecientes: async (): Promise<Cita[]> => {
    const { data } = await httpClient.get('/citas/detalle')
    return Array.isArray(data) ? data : data.data ?? []
  },

  getMascotasRecientes: async (): Promise<Mascota[]> => {
    const { data } = await httpClient.get('/pets/detalle')
    return Array.isArray(data) ? data : data.data ?? []
  },
}