import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import SelectorTipo from '../components/solicitud/SelectorTipo'
import FormSolicitud from '../components/solicitud/FormSolicitud'
import MisSolicitudes from '../components/solicitud/MisSolicitudes'
import { useAuth } from '../context/AuthContext'
import type { Solicitud, TipoSolicitud } from '../data/datosLIF'
import { buscarTipo, tiposSolicitud } from '../data/solicitud'
import { apiDelete, apiGet, apiPost, mensajeApi } from '../api/client'

export default function Solicitudes() {
  const { usuario, cargando: authCargando } = useAuth()
  const [mias, setMias] = useState<Solicitud[]>([])
  const [cargando, setCargando] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clave, setClave] = useState<TipoSolicitud>('cancha')

  useEffect(() => {
    if (!usuario) return

    let activo = true
    apiGet<Solicitud[]>('/solicitudes/mias')
      .then((solicitudes) => {
        if (activo) {
          setMias(solicitudes)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (activo) setError(mensajeApi(e))
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => { activo = false }
  }, [usuario])

  const def = buscarTipo(clave)
  const enviar = async (datos: Record<string, string>, detalle: string): Promise<boolean> => {
    if (!usuario) return false
    setError(null)
    setEnviando(true)
    try {
      const creada = await apiPost<Solicitud>('/solicitudes', { tipo: def.clave, datos, detalle })
      setMias((actuales) => [creada, ...actuales])
      alert('✅ Solicitud enviada. Quedará pendiente de revisión.')
      return true
    } catch (e) {
      setError(mensajeApi(e))
      return false
    } finally {
      setEnviando(false)
    }
  }

  const cancelar = async (id: number): Promise<boolean> => {
    setError(null)
    try {
      await apiDelete(`/solicitudes/${id}`)
      setMias((actuales) => actuales.filter((solicitud) => solicitud.id !== id))
      return true
    } catch (e) {
      setError(mensajeApi(e))
      return false
    }
  }

  return (
    <>
      <PageHero
        etiqueta="Gestión y Trámites"
        titulo="Solicitudes"
        subtitulo="Reservas, inscripciones y trámites de la liga en un solo lugar"
      />

      <section className="container py-5">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {authCargando ? (
          <p className="text-center text-body-secondary" role="status">Verificando sesión…</p>
        ) : !usuario ? (
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
                  {enviando && <span className="visually-hidden" role="status">Enviando solicitud…</span>}
                </div>
              </div>

              <div className="col-lg-5">
                {cargando ? (
                  <p className="text-body-secondary" role="status">Cargando tus solicitudes…</p>
                ) : (
                  <MisSolicitudes solicitudes={mias} onCancelar={cancelar} />
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}
