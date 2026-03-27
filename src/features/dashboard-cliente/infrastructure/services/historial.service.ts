import { httpClient } from '@/src/core/lib/http/http-client'
import { Historial } from '../../domain/entities/historial.entity'

export const historialService = {
  getHistorialByMascota: async (mascotaId: number): Promise<Historial[]> => {
    const { data } = await httpClient.get(`/historial/mascota/${mascotaId}`)
    return Array.isArray(data) ? data : data.data ?? []
  },
}