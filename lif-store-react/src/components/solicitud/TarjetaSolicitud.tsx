import { Fragment, type ReactNode } from 'react'
import type { Solicitud } from '../../data/datosLIF'
import { buscarTipo, claseEstado } from '../../data/solicitud'
import { formatearFecha } from '../../utils/formato'
import { describirDatos, folioDe } from '../../utils/solicitudes'

interface TarjetaSolicitudProps {
  solicitud: Solicitud
  mostrarSolicitante?: boolean
  children?: ReactNode // zona de acciones (botones), distinta según quién la use
}

export default function TarjetaSolicitud({
  solicitud: s,
  mostrarSolicitante = false,
  children,
}: TarjetaSolicitudProps) {
  const tipo = buscarTipo(s.tipo)

  return (
    <li className="list-group-item py-3">
      <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap">
        <div>
          <div className="fw-bold">
            {tipo.icono} {tipo.titulo}
          </div>
          <small className="text-body-secondary d-block">
            {folioDe(s.id)} · {formatearFecha(s.fecha)}
            {mostrarSolicitante && ` · ${s.nombreSolicitante} (${s.solicitante})`}
          </small>
        </div>
        <span className={`badge rounded-pill ${claseEstado[s.estado]}`}>{s.estado}</span>
      </div>

      <dl className="row small mt-2 mb-2">
        {describirDatos(tipo, s.datos).map((d) => (
          <Fragment key={d.etiqueta}>
            <dt className="col-sm-4 text-body-secondary fw-semibold">{d.etiqueta}</dt>
            <dd className="col-sm-8 mb-1">{d.valor}</dd>
          </Fragment>
        ))}
      </dl>

      {s.detalle && <p className="small mb-2">{s.detalle}</p>}

      {children && <div className="d-flex gap-2 flex-wrap">{children}</div>}
    </li>
  )
}