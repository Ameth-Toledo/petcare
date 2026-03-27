'use client'

import { useState } from 'react'
import { X, CalendarDays } from 'lucide-react'
import { Mascota } from '../../domain/entities/mascota.entity'
import { useCrearCitaViewModel } from '../viewmodels/crear-cita.viewmodel'

interface ModalAgendarCitaProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mascotas: Mascota[]
}

const SERVICIOS = [
  { id: 1, nombre: 'Consulta general', precio: '250.00' },
  { id: 2, nombre: 'Vacunación', precio: '180.00' },
  { id: 3, nombre: 'Baño y corte', precio: '300.00' },
  { id: 4, nombre: 'Desparasitación', precio: '150.00' },
  { id: 5, nombre: 'Cirugía menor', precio: '800.00' },
]

export const ModalAgendarCita = ({ isOpen, onClose, onSuccess, mascotas }: ModalAgendarCitaProps) => {
  const [idMascota, setIdMascota] = useState('')
  const [idServicio, setIdServicio] = useState('')
  const [fecha, setFecha] = useState('')
  const [observaciones, setObservaciones] = useState('')

  const { crearCita, isLoading, error } = useCrearCitaViewModel(onSuccess)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')
    await crearCita({
      id_user: user.id,
      id_mascota: parseInt(idMascota),
      id_servicio: parseInt(idServicio),
      fecha,
      observaciones_cliente: observaciones || undefined,
    })
    handleClose()
  }

  const handleClose = () => {
    setIdMascota(''); setIdServicio(''); setFecha(''); setObservaciones('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 z-10">

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-[#267A6E]" />
            <h2 className="text-base font-bold text-gray-900">Agendar cita</h2>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Mascota</label>
            <select
              value={idMascota}
              onChange={e => setIdMascota(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white cursor-pointer"
            >
              <option value="">Selecciona una mascota</option>
              {mascotas.map(m => (
                <option key={m.id} value={m.id}>{m.nombre} ({m.especie})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Servicio</label>
            <select
              value={idServicio}
              onChange={e => setIdServicio(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white cursor-pointer"
            >
              <option value="">Selecciona un servicio</option>
              {SERVICIOS.map(s => (
                <option key={s.id} value={s.id}>{s.nombre} — ${s.precio}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Fecha y hora</label>
            <input
              type="datetime-local"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              required
              min={new Date().toISOString().slice(0, 16)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Observaciones <span className="text-gray-300">(opcional)</span></label>
            <textarea
              value={observaciones}
              onChange={e => setObservaciones(e.target.value)}
              placeholder="Ej. Mi perro es nervioso con extraños..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white resize-none"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 text-sm font-semibold text-gray-500 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 text-sm font-semibold text-white bg-[#267A6E] hover:bg-[#1d6259] disabled:opacity-60 py-3 rounded-xl transition-colors cursor-pointer"
            >
              {isLoading ? 'Agendando...' : 'Agendar cita'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}