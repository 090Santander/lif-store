import { useState } from 'react'
import PageHero from '../components/PageHero'
import { DatosLIF, type Partido } from '../data/datosLIF'

export default function Partidos() {
  const [partidos] = useState(() => DatosLIF.get<Partido>('partidos'))

  return (
    <>
      <PageHero
        etiqueta="Programación Oficial"
        titulo="Fixture y Resultados"
        claseEtiqueta="bg-light text-success"
      />

      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header bg-dark-green text-white fw-bold py-3 text-center border-0">
                📅 Próximas Fechas Programadas
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center m-0">
                  <thead className="extra-small text-body-secondary text-uppercase">
                    <tr>
                      <th scope="col">Fecha / Hora</th>
                      <th scope="col">Cancha</th>
                      <th scope="col" className="text-end w-25">Local</th>
                      <th scope="col"></th>
                      <th scope="col" className="text-start w-25">Visita</th>
                      <th scope="col">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partidos.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-4 text-body-secondary">
                          No hay partidos programados por el momento.
                        </td>
                      </tr>
                    ) : (
                      partidos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.fecha} · {p.hora}</td>
                            <td>{p.sede}</td>
                            <td className="text-end fw-bold">{p.equipoLocal}</td>
                            <td className="text-body-secondary">
                            {p.golesLocal !== undefined && p.golesVisita !== undefined
                                ? `${p.golesLocal} - ${p.golesVisita}`
                                : 'vs'}
                            </td>
                            <td className="text-start fw-bold">{p.equipoVisitante}</td>
                            <td>
                            <span className="badge bg-secondary">{p.estado ?? 'Programado'}</span>
                            </td>
                        </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}