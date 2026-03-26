import { IUserRepository } from '../repositories/user.repository'
import { LoginRequest } from '../dtos/request/login.request'
import { AuthResponse } from '../dtos/response/auth.response'

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(credentials: LoginRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(credentials.email)
    if (!user) throw new Error('Credenciales inválidas')
    return user as AuthResponse
  }
}