import { useState } from 'react'
import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import SelectorTipo from '../components/solicitud/SelectorTipo'
import FormSolicitud from '../components/solicitud/FormSolicitud'
import MisSolicitudes from '../components/solicitud/MisSolicitudes'
import { useAuth } from '../context/AuthContext'
import { useColeccion } from '../hooks/useColeccion'
import type { Solicitud, TipoSolicitud } from '../data/datosLIF'
import { buscarTipo, tiposSolicitud } from '../data/solicitud'
import { crearSolicitud } from '../utils/solicitudes'

export default function Solicitudes() {
  const { usuario } = useAuth()
  const solicitudes = useColeccion<Solicitud>('solicitudes')
  const [clave, setClave] = useState<TipoSolicitud>('cancha')

  const def = buscarTipo(clave)
  const mias = solicitudes.items
    .filter((s) => s.solicitante === usuario?.correo)
    .sort((a, b) => b.id - a.id) // las más recientes primero

  const enviar = (datos: Record<string, string>, detalle: string) => {
    if (!usuario) return
    solicitudes.agregar(crearSolicitud(def, datos, detalle, usuario))
    alert('✅ Solicitud enviada. Quedará pendiente de revisión.')
  }

  return (
    <>
      <PageHero
        etiqueta="Gestión y Trámites"
        titulo="Solicitudes"
        subtitulo="Reservas, inscripciones y trámites de la liga en un solo lugar"
      />

      <section className="container py-5">
        {!usuario ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
            <span className="display-5 mb-2">🔒</span>
            <h2 className="h5 fw-bold">Inicia sesión para enviar una solicitud</h2>
            <p className="text-body-secondary">
              Así podremos asociarla a tu cuenta y mostrarte su estado.
            </p>
            <div className="d-flex justify-content-center gap-2">
              <Link to="/login" className="btn btn-success rounded-pill fw-bold px-4">
                Ingresar
              </Link>
              <Link to="/registro" className="btn btn-outline-success rounded-pill fw-bold px-4">
                Registrarme
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h2 className="h5 fw-bold text-uppercase mb-3">1. ¿Qué necesitas solicitar?</h2>
            <div className="mb-5">
              <SelectorTipo tipos={tiposSolicitud} activa={clave} onSeleccionar={setClave} />
            </div>

            <div className="row g-4">
              <div className="col-lg-7">
                <div className="card border-0 shadow-sm rounded-4 p-4">
                  <h2 className="h5 fw-bold mb-3">
                    2. {def.icono} {def.titulo}
                  </h2>
                  {/* key: al cambiar de tipo, React crea un formulario nuevo con estado limpio */}
                  <FormSolicitud key={def.clave} def={def} onEnviar={enviar} />
                </div>
              </div>

              <div className="col-lg-5">
                <MisSolicitudes solicitudes={mias} onCancelar={solicitudes.eliminar} />
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}