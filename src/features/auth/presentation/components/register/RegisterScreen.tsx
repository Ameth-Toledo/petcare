'use client'

import { useRegisterViewModel } from '../../viewmodels/register.viewmodel'

export const RegisterScreen = () => {
  const { register, isLoading, error } = useRegisterViewModel()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    //register({
      //email: form.email.value,
      // password: form.password.value,
 //   })
  }

  return (
    <div>
      {/* Tu HTML aquí */}
    </div>
  )
}