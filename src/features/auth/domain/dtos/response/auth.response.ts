import { Role } from '../../entities/role.entity'

export interface AuthResponse {
  id: number
  nombre: string
  apellido: string
  email: string
  rol: Role
  avatar_url?: string
}