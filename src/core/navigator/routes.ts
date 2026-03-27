export const Routes = {
  landing: '/',
  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },
  dashboard: {
    cliente: {
      overview: '/dashboard/cliente',
      citas: '/dashboard/cliente/citas',
      mascotas: '/dashboard/cliente/mascotas',
      configuracion: '/dashboard/cliente/configuracion',
    },
    admin: {
      overview: '/dashboard/admin',
      usuarios: '/dashboard/admin/usuarios',
    },
    veterinario: {
      overview: '/dashboard/veterinario',
      citas: '/dashboard/veterinario/citas',
      pacientes: '/dashboard/veterinario/pacientes',
      configuracion: '/dashboard/veterinario/configuracion',
    }
  }
}