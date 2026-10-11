import type { TipoSolicitud } from '../../data/datosLIF'
import type { TipoSolicitudDef } from '../../data/solicitud'

interface SelectorTipoProps {
  tipos: TipoSolicitudDef[]
  activa: TipoSolicitud
  onSeleccionar: (clave: TipoSolicitud) => void
}

export default function SelectorTipo({ tipos, activa, onSeleccionar }: SelectorTipoProps) {
  return (
    <div className="row row-cols-2 row-cols-md-3 g-3">
      {tipos.map((t) => {
        const seleccionado = t.clave === activa
        return (
          <div className="col" key={t.clave}>
            <button
              type="button"
              aria-pressed={seleccionado}
              className={`card w-100 h-100 text-start p-3 card-hover ${
                seleccionado ? 'border-2 border-success bg-success-subtle' : 'border-0 shadow-sm'
              }`}
              onClick={() => onSeleccionar(t.clave)}
            >
              <span className="fs-3">{t.icono}</span>
              <span className="fw-bold text-body">{t.titulo}</span>
              <span className="small text-body-secondary">{t.descripcion}</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}