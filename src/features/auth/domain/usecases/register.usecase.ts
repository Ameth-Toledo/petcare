import { IUserRepository } from '../repositories/user.repository'
import { RegisterRequest } from '../dtos/request/register.request'
import { AuthResponse } from '../dtos/response/auth.response'
import { Role } from '../entities/role.entity'

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: RegisterRequest): Promise<AuthResponse> {
    const existing = await this.userRepository.findByEmail(data.email)
    if (existing) throw new Error('El email ya está registrado')

    const user = await this.userRepository.create({
      ...data,
      password: data.password,
      rol: Role.USER,
    })

    return user as AuthResponse
  }
}