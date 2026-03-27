export type EstadoCitaVet = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA'

export interface CitaVetProps {
  id: number
  nombre_mascota: string
  nombre_dueno: string
  apellido_dueno: string
  hora: string
  nombre_servicio: string
  estado: EstadoCitaVet
}