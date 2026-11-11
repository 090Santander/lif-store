import { useState } from 'react'
import PageHero from '../components/PageHero'
import { actas, type Sancion } from '../data/actas'
import { filtrarSanciones } from '../utils/actas'

const claseBadge: Record<Sancion['tipo'], string> = {
  roja: 'bg-danger',
  amarilla: 'bg-warning text-dark',
}

export default function Actas() {
  const [busqueda, setBusqueda] = useState('')
  const [abierta, setAbierta] = useState<number | null>(actas[0].numero)

  const alternar = (numero: number) => setAbierta(abierta === numero ? null : numero)

  return (
    <>
      <PageHero
        etiqueta="Tribunal de Disciplina"
        titulo="Actas y Sanciones"
        subtitulo="Resoluciones oficiales de la última jornada"
      />

      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="mb-4">
              <label htmlFor="inputBuscarActa" className="visually-hidden">
                Buscar jugador o equipo
              </label>
              <input
                type="text"
                id="inputBuscarActa"
                className="form-control rounded-pill border-success shadow-sm"
                placeholder="🔍 Buscar por nombre de jugador o equipo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="accordion shadow-sm rounded-4 overflow-hidden border-0">
              {actas.map((acta) => {
                const estaAbierta = abierta === acta.numero
                const sanciones = acta.sanciones ? filtrarSanciones(acta.sanciones, busqueda) : null

                return (
                  <div className="accordion-item border-0 border-bottom" key={acta.numero}>
                    <h2 className="accordion-header">
                      <button
                        type="button"
                        className={`accordion-button fw-bold ${estaAbierta ? 'text-success' : 'collapsed'}`}
                        aria-expanded={estaAbierta}
                        onClick={() => alternar(acta.numero)}
                      >
                        ⚖️ Acta N° {String(acta.numero).padStart(2, '0')} - {acta.titulo}
                      </button>
                    </h2>

                    <div className={`accordion-collapse collapse ${estaAbierta ? 'show' : ''}`}>
                      {sanciones ? (
                        <div className="accordion-body p-0">
                          <div className="table-responsive">
                            <table className="table table-hover align-middle m-0 text-center">
                              <thead className="extra-small text-uppercase">
                                <tr className="fila-exito">
                                  <th scope="col">Jugador</th>
                                  <th scope="col">Equipo</th>
                                  <th scope="col">Falta</th>
                                  <th scope="col">Sanción</th>
                                </tr>
                              </thead>
                              <tbody className="small">
                                {sanciones.length === 0 ? (
                                  <tr>
                                    <td colSpan={4} className="py-3 text-body-secondary">
                                      Sin resultados para "{busqueda}".
                                    </td>
                                  </tr>
                                ) : (
                                  sanciones.map((s) => (
                                    <tr key={`${s.jugador}-${s.equipo}`}>
                                      <td className="fw-bold">{s.jugador}</td>
                                      <td>{s.equipo}</td>
                                      <td>{s.falta}</td>
                                      <td>
                                        <span className={`badge rounded-pill ${claseBadge[s.tipo]}`}>{s.sancion}</span>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="p-3 text-end bg-body">
                            <button type="button" className="btn btn-sm btn-outline-success rounded-pill fw-bold">
                              {acta.textoDescarga}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="accordion-body p-4 text-center">
                          <p className="small text-body-secondary mb-3">{acta.resumen}</p>
                          <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill fw-bold">
                            {acta.textoDescarga}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 text-center">
              <p className="extra-small text-body-secondary">
                Las apelaciones deben presentarse antes del día jueves a las 20:00 hrs mediante correo oficial del
                delegado de cada club.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}