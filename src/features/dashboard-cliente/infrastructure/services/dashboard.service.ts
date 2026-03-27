import { httpClient } from '@/src/core/lib/http/http-client'
import { Cita } from '../../domain/entities/cita.entity'
import { Mascota } from '../../domain/entities/mascota.entity'
import { CreateMascotaRequest } from '../../domain/dtos/request/create-mascota.request'
import { CreateCitaRequest } from '../../domain/dtos/request/create-cita.request'

export const dashboardClienteService = {
  getCitasRecientes: async (): Promise<Cita[]> => {
    const { data } = await httpClient.get('/citas/detalle')
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista.map((c: any) => ({
      ...c,
      id: c.id_cita,
      fecha: c.fecha_cita,
      estado: c.estado_cita,
      nombre_mascota: c.mascota,
      nombre_dueno: c.dueno?.split(' ')[0] ?? '',
      apellido_dueno: c.dueno?.split(' ')[1] ?? '',
      nombre_veterinario: c.veterinario?.split(' ')[0] ?? '',
      apellido_veterinario: c.veterinario?.split(' ')[1] ?? '',
      nombre_servicio: c.servicio,
      precio_servicio: c.precio,
    }))
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