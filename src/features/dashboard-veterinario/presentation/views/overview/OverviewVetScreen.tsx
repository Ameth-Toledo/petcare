'use client'

import { NavBarVetComponent } from "../../components/NavBarVet"
import { StatCard } from "../../components/StatCard"
import { CitasTable } from "../../components/CitasTable"
import { PacientesTable } from "../../components/PacientesTable"
import { CalendarDays, PawPrint } from "lucide-react"
import { CitaVetProps } from "../../types/cita.vet.types"
import { PacienteVetProps } from "../../types/paciente.vet.types"

const citasRecientes: CitaVetProps[] = [
  { id: 1, nombre_mascota: 'Max', nombre_dueno: 'Carlos', apellido_dueno: 'García', hora: '10:00 AM', nombre_servicio: 'Vacunación anual', estado: 'CONFIRMADA' },
  { id: 2, nombre_mascota: 'Luna', nombre_dueno: 'Ana', apellido_dueno: 'Martínez', hora: '11:30 AM', nombre_servicio: 'Revisión general', estado: 'PENDIENTE' },
]

const pacientesRecientes: PacienteVetProps[] = [
  { id: 1, nombre: 'Max', especie: 'Perro', raza: 'Labrador', nombre_dueno: 'Carlos', apellido_dueno: 'García', activo: true },
  { id: 2, nombre: 'Luna', especie: 'Gato', raza: 'Siamés', nombre_dueno: 'Ana', apellido_dueno: 'Martínez', activo: true },
  { id: 3, nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog', nombre_dueno: 'Luis', apellido_dueno: 'Hernández', activo: false },
]

export const OverviewVetScreen = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBarVetComponent
        title="INICIO"
        subtitle="Gestiona tu contenido aquí..."
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-y-auto">

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Citas hoy"
            value={citasRecientes.length}
            description={`${citasRecientes.length} citas en total`}
            icon={<CalendarDays size={22} className="text-[#267A6E]" />}
          />
          <StatCard
            label="Pacientes activos"
            value={pacientesRecientes.filter(p => p.activo).length}
            description={`${pacientesRecientes.length} pacientes en total`}
            icon={<PawPrint size={22} className="text-[#267A6E]" />}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
          <CitasTable citas={citasRecientes} />
          <PacientesTable pacientes={pacientesRecientes} />
        </div>

      </div>
    </div>
  )
}