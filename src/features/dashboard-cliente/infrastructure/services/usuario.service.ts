import { httpClient } from '@/src/core/lib/http/http-client'
import { Usuario } from '../../domain/entities/usuario.entity'
import { UpdatePerfilRequest } from '../../domain/dtos/request/update-perfil.request'

export const usuarioService = {
  getMe: async (): Promise<Usuario> => {
    const { data } = await httpClient.get('/auth/me')
    return data.user ?? data.data ?? data
  },

  updatePerfil: async (id: number, payload: UpdatePerfilRequest): Promise<Usuario> => {
    const { data } = await httpClient.put<{ success: boolean; data: Usuario }>(`/clients/${id}`, payload)
    return data.data
  },

  changePassword: async (passwordActual: string, nuevaPassword: string): Promise<void> => {
    await httpClient.put('/veterinarios/cambiar-password', {
      password_actual: passwordActual,
      password_nueva:  nuevaPassword,
    })
  },
}