'use client'

import { User, Mail, Phone, Camera, Pencil, Check, X } from 'lucide-react'

interface PerfilCardProps {
  nombre: string
  apellido: string
  email: string
  telefono: string
  editando: boolean
  onEditar: () => void
  onGuardar: () => void
  onCancelar: () => void
  setNombre: (v: string) => void
  setApellido: (v: string) => void
  setTelefono: (v: string) => void
}

export const PerfilCard = ({
  nombre, apellido, email, telefono,
  editando, onEditar, onGuardar, onCancelar,
  setNombre, setApellido, setTelefono,
}: PerfilCardProps) => {
  const iniciales = `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase()

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-[#267A6E]/10 flex items-center justify-center text-[#267A6E] font-bold text-lg select-none">
              {iniciales}
            </div>
            <button className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#267A6E] rounded-full flex items-center justify-center text-white hover:bg-[#1d6259] transition-colors cursor-pointer">
              <Camera size={10} />
            </button>
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-base leading-tight">{nombre} {apellido}</p>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </div>

        {!editando ? (
          <button onClick={onEditar} className="flex items-center gap-1 text-xs font-semibold text-[#267A6E] border border-[#267A6E]/30 px-3 py-1.5 rounded-full hover:bg-[#267A6E]/5 transition-colors cursor-pointer">
            <Pencil size={11} /> Editar
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={onCancelar} className="flex items-center gap-1 text-xs font-semibold text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
              <X size={11} /> Cancelar
            </button>
            <button onClick={onGuardar} className="flex items-center gap-1 text-xs font-semibold text-white bg-[#267A6E] px-3 py-1.5 rounded-full hover:bg-[#1d6259] transition-colors cursor-pointer">
              <Check size={11} /> Guardar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field icon={<User size={13} />} label="Nombre" value={nombre} editing={editando} onChange={setNombre} />
        <Field icon={<User size={13} />} label="Apellido" value={apellido} editing={editando} onChange={setApellido} />
        <Field icon={<Mail size={13} />} label="Correo electrónico" value={email} editing={false} />
        <Field icon={<Phone size={13} />} label="Teléfono" value={telefono} editing={editando} onChange={setTelefono} />
      </div>
    </div>
  )
}

interface FieldProps {
  icon: React.ReactNode
  label: string
  value: string
  editing: boolean
  onChange?: (v: string) => void
}

const Field = ({ icon, label, value, editing, onChange }: FieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="flex items-center gap-1 text-xs text-gray-400 font-medium">
      <span className="text-[#267A6E]">{icon}</span>
      {label}
    </label>
    {editing && onChange ? (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full text-sm text-gray-900 border border-[#267A6E]/40 rounded-xl px-3 py-2 outline-none focus:border-[#267A6E] transition-colors bg-white"
      />
    ) : (
      <p className="text-sm text-gray-700 font-medium px-3 py-2 bg-gray-50 rounded-xl truncate">{value}</p>
    )}
  </div>
)