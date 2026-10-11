import { useState } from 'react'
import PageHero from '../components/PageHero'
import { categorias, posicionesPorCategoria, type Categoria, type EstadoEquipo } from '../data/posiciones'
import { obtenerIniciales } from '../utils/iniciales'

const estilos: Record<EstadoEquipo, { fila: string; indicador: string }> = {
  campeon: { fila: 'table-success border-success', indicador: 'bg-success' },
  riesgo: { fila: 'table-danger border-danger', indicador: 'bg-danger' },
  normal: { fila: '', indicador: 'bg-transparent' },
}

export default function Posiciones() {
  const [categoria, setCategoria] = useState<Categoria>('Senior')
  const equipos = posicionesPorCategoria[categoria]

  return (
    <>
      <PageHero etiqueta="Clasificación" titulo="Tabla de Posiciones" />

      <section className="container py-5">
        <div className="d-flex justify-content-center mb-4">
          <div
            className="btn-group rounded-pill shadow-sm p-1 bg-body border"
            role="group"
            aria-label="Selección de Categoría"
          >
            {categorias.map((c) => (
              <button
                key={c}
                type="button"
                className={`btn rounded-pill fw-bold border-0 ${
                  c === categoria ? 'btn-success active' : 'btn-outline-success'
                }`}
                onClick={() => setCategoria(c)}
              >
                Serie {c}
              </button>
            ))}
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center m-0">
                  <thead className="bg-dark-green text-white extra-small text-uppercase">
                    <tr>
                      <th scope="col" className="py-3">Pos</th>
                      <th scope="col" className="text-start py-3 w-25">Equipo</th>
                      <th scope="col" className="py-3" title="Partidos Jugados">PJ</th>
                      <th scope="col" className="py-3" title="Partidos Ganados">PG</th>
                      <th scope="col" className="py-3" title="Partidos Empatados">PE</th>
                      <th scope="col" className="py-3" title="Partidos Perdidos">PP</th>
                      <th scope="col" className="py-3" title="Diferencia de Goles">DIF</th>
                      <th scope="col" className="py-3 fs-6">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="small">
                    {equipos.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-4 text-body-secondary">
                          Aún no hay datos para la Serie {categoria}.
                        </td>
                      </tr>
                    ) : (
                      equipos.map((eq, index) => (
                        <tr key={eq.equipo} className={estilos[eq.estado].fila}>
                          <td className="fw-bold py-3">{index + 1}</td>
                          <td className="text-start fw-bold text-nowrap">
                            <div className="d-flex align-items-center">
                              <span
                                className={`badge ${estilos[eq.estado].indicador} rounded-circle p-1 me-2`}
                                style={{ width: 10, height: 10 }}
                              ></span>
                              <div
                                className="bg-warning text-dark fw-bold rounded-circle d-flex justify-content-center align-items-center me-2 shadow-sm"
                                style={{ width: 30, height: 30, fontSize: 12, flexShrink: 0 }}
                              >
                                {obtenerIniciales(eq.equipo)}
                              </div>
                              {eq.equipo}
                            </div>
                          </td>
                          <td className="py-3">{eq.pj}</td>
                          <td className="py-3">{eq.pg}</td>
                          <td className="py-3">{eq.pe}</td>
                          <td className="py-3">{eq.pp}</td>
                          <td className="py-3">{eq.dif}</td>
                          <td className={`py-3 fw-black fs-6 ${eq.estado === 'campeon' ? 'text-success' : ''}`}>
                            {eq.pts}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-between align-items-center extra-small text-body-secondary flex-wrap gap-2">
              <div className="d-flex align-items-center gap-3">
                <span><span className="badge bg-success rounded-circle p-1"> </span> Primer Lugar (Campeón / Clasificado)</span>
                <span><span className="badge bg-danger rounded-circle p-1"> </span> Zona de Riesgo</span>
              </div>
              <span>* PJ: Jugados | PG: Ganados | PE: Empatados | PP: Perdidos | PTS: Puntos</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}