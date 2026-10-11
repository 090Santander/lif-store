import type { Solicitud, Usuario } from '../data/datosLIF'
import type { TipoSolicitudDef } from '../data/solicitud'
import { validarRun } from './validaciones'

export type ErroresSolicitud = Record<string, string>


export function fechaHoyISO(ahora: Date = new Date()): string {
  const anio = ahora.getFullYear()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const dia = String(ahora.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}


export function valoresIniciales(def: TipoSolicitudDef): Record<string, string> {
  return Object.fromEntries(
    def.campos.map((c) => [c.id, c.tipo === 'select' ? (c.opciones?.[0] ?? '') : '']),
  )
}

export function validarSolicitud(
  def: TipoSolicitudDef,
  datos: Record<string, string>,
  detalle: string,
  hoy: string = fechaHoyISO(),
): ErroresSolicitud {
  const errores: ErroresSolicitud = {}

  for (const campo of def.campos) {
    const valor = (datos[campo.id] ?? '').trim()

    if (!valor) {
      if (campo.requerido) errores[campo.id] = `${campo.etiqueta} es obligatorio.`
      continue
    }

    if (campo.formato === 'run') {
      const error = validarRun(valor)
      if (error) errores[campo.id] = error
    }

    if (campo.tipo === 'number') {
      const numero = Number(valor)
      if (Number.isNaN(numero)) errores[campo.id] = 'Ingresa un número válido.'
      else if (campo.min !== undefined && numero < campo.min) errores[campo.id] = `Debe ser al menos ${campo.min}.`
      else if (campo.max !== undefined && numero > campo.max) errores[campo.id] = `No puede superar ${campo.max}.`
    }

    if (campo.tipo === 'date' && campo.fechaFutura && valor < hoy) {
      errores[campo.id] = 'La fecha no puede ser anterior a hoy.'
    }
  }

  if (def.detalleRequerido && !detalle.trim()) {
    errores.detalle = `${def.detalleEtiqueta} es obligatorio.`
  }

  return errores
}

export function crearSolicitud(
  def: TipoSolicitudDef,
  datos: Record<string, string>,
  detalle: string,
  usuario: Usuario,
  ahora: Date = new Date(),
): Omit<Solicitud, 'id'> {
  return {
    tipo: def.clave,
    datos: Object.fromEntries(def.campos.map((c) => [c.id, (datos[c.id] ?? '').trim()])),
    detalle: detalle.trim(),
    solicitante: usuario.correo,
    nombreSolicitante: usuario.nombre,
    fecha: ahora.toISOString(),
    estado: 'Pendiente',
  }
}


export function folioDe(id: number): string {
  return `SOL-${String(id).slice(-6)}`
}


export function describirDatos(
  def: TipoSolicitudDef,
  datos: Record<string, string>,
): { etiqueta: string; valor: string }[] {
  return def.campos
    .filter((c) => datos[c.id])
    .map((c) => ({ etiqueta: c.etiqueta, valor: datos[c.id] }))
}