import PageHero from '../components/PageHero'
import { posiciones, type EstadoEquipo } from '../data/posiciones'
import { obtenerIniciales } from '../utils/iniciales'

const estilos: Record<EstadoEquipo, { fila: string; indicador: string }> = {
  campeon: { fila: 'table-success border-success', indicador: 'bg-success' },
  riesgo: { fila: 'table-danger border-danger', indicador: 'bg-danger' },
  normal: { fila: '', indicador: 'bg-transparent' },
}

export default function Posiciones() {
  return (
    <>
      <PageHero etiqueta="Clasificación" titulo="Tabla de Posiciones" />

      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="table-responsive">
                <table className="table align-middle text-center m-0">
                  <thead className="extra-small text-body-secondary text-uppercase">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col" className="text-start">Equipo</th>
                      <th scope="col">PJ</th>
                      <th scope="col">PG</th>
                      <th scope="col">PE</th>
                      <th scope="col">PP</th>
                      <th scope="col">DIF</th>
                      <th scope="col">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posiciones.map((eq, index) => (
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
                    ))}
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