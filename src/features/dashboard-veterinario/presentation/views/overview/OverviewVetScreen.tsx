'use client'

import { NavBarVetComponent } from "../../components/NavBarVet"

export const OverviewVetScreen = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
        <NavBarVetComponent
            title="INICIO"
            subtitle="Gestiona tu contenido aqui..."
        />
    </div>
  )
}