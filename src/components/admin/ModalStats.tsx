import { useState, type FormEvent } from 'react'
import Campo from '../Campo'
import type { Jugador } from '../../data/datosLIF'

export interface Estadisticas {
  pj: number
  goles: number
  ta: number
  tr: number
}

interface ModalStatsProps {
  jugador: Jugador
  onGuardar: (stats: Estadisticas) => void
  onCerrar: () => void
}

export default function ModalStats({ jugador, onGuardar, onCerrar }: ModalStatsProps) {
  const [form, setForm] = useState({
    pj: String(jugador.pj ?? 0),
    goles: String(jugador.goles ?? 0),
    ta: String(jugador.ta ?? 0),
    tr: String(jugador.tr ?? 0),
  })

  const cambiar = (campo: keyof typeof form) => (valor: string) =>
    setForm({ ...form, [campo]: valor })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    onGuardar({
      pj: parseInt(form.pj) || 0,
      goles: parseInt(form.goles) || 0,
      ta: parseInt(form.ta) || 0,
      tr: parseInt(form.tr) || 0,
    })
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" onSubmit={enviar}>
            <div className="modal-header">
              <h5 className="modal-title">📊 Estadísticas</h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar}></button>
            </div>
            <div className="modal-body">
              <p className="fw-bold">{jugador.nombre} ({jugador.equipo})</p>
              <div className="row">
                <div className="col-6">
                  <Campo id="stat-pj" etiqueta="Partidos jugados" type="number" min={0} value={form.pj} onChange={cambiar('pj')} />
                </div>
                <div className="col-6">
                  <Campo id="stat-goles" etiqueta="Goles" type="number" min={0} value={form.goles} onChange={cambiar('goles')} />
                </div>
                <div className="col-6">
                  <Campo id="stat-ta" etiqueta="Tarjetas amarillas" type="number" min={0} value={form.ta} onChange={cambiar('ta')} />
                </div>
                <div className="col-6">
                  <Campo id="stat-tr" etiqueta="Tarjetas rojas" type="number" min={0} value={form.tr} onChange={cambiar('tr')} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCerrar}>Cancelar</button>
              <button type="submit" className="btn btn-success fw-bold">Guardar</button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}