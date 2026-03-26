'use client'

import { HeaderComponent } from '@/src/core/components/header/view/header'
import { useLoginViewModel } from '../../viewmodels/login.viewmodel'

export const LoginScreen = () => {
  const { login, isLoading, error } = useLoginViewModel()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    login({
      email: form.email.value,
      password: form.password.value,
    })
  }

  return (
    <div>
      <HeaderComponent></HeaderComponent>
    </div>
  )
}