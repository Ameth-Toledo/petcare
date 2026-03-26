import { httpClient } from '@/src/core/lib/http/http-client'
import { LoginRequest } from '../../domain/dtos/request/login.request'
import { RegisterRequest } from '../../domain/dtos/request/register.request'
import { AuthResponse } from '../../domain/dtos/response/auth.response'

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await httpClient.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await httpClient.post<AuthResponse>('/auth/register', payload)
    return data
  },

  logout: async (): Promise<void> => {
    await httpClient.post('/auth/logout')
  },
}