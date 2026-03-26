import { UserRepositoryImpl } from '@/src/features/auth/infrastructure/repositories/user.repository.impl'
import { LoginUseCase } from '@/src/features/auth/domain/usecases/login.usecase'
import { RegisterUseCase } from '@/src/features/auth/domain/usecases/register.usecase'

const userRepository = new UserRepositoryImpl()

export const authContainer = {
  loginUseCase: new LoginUseCase(userRepository),
  registerUseCase: new RegisterUseCase(userRepository),
}