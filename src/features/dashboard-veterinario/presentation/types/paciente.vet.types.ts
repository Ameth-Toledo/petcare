export interface PacienteVetProps {
  id: number
  nombre: string
  especie: string
  raza: string | null
  nombre_dueno: string
  apellido_dueno: string
  activo: boolean
}