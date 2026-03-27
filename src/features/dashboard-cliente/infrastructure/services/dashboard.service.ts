import { httpClient } from '@/src/core/lib/http/http-client'
import { Cita } from '../../domain/entities/cita.entity'
import { Mascota } from '../../domain/entities/mascota.entity'
import { CreateMascotaRequest } from '../../domain/dtos/request/create-mascota.request'
import { CreateCitaRequest } from '../../domain/dtos/request/create-cita.request'

export const dashboardClienteService = {
  getCitasRecientes: async (): Promise<Cita[]> => {
    const { data } = await httpClient.get('/citas/detalle')
    return Array.isArray(data) ? data : data.data ?? []
  },

  getMascotasRecientes: async (): Promise<Mascota[]> => {
    const { data } = await httpClient.get('/pets/detalle')
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista.map((m: any) => ({ ...m, id: m.id_mascota ?? m.id }))
  },
  
  createMascota: async (payload: CreateMascotaRequest): Promise<Mascota> => {
    const { data } = await httpClient.post<{ success: boolean; data: Mascota }>('/pets', payload)
    return data.data
  },

  createCita: async (payload: CreateCitaRequest): Promise<Cita> => {
    const { data } = await httpClient.post<{ success: boolean; data: Cita }>('/citas', payload)
    return data.data
  },
}