import type { EstadoSolicitud, TipoSolicitud } from './datosLIF'
import { actas } from './actas'
import { categorias } from './posiciones'
import { sedes } from './sede'

export interface CampoSolicitud {
  id: string
  etiqueta: string
  tipo: 'text' | 'number' | 'date' | 'time' | 'tel' | 'select'
  requerido: boolean
  opciones?: string[]
  placeholder?: string
  min?: number
  max?: number
  maxLength?: number
  ancho?: 6 | 12 // columnas de Bootstrap (por defecto 6)
  formato?: 'run' // activa la validación de RUN
  fechaFutura?: boolean // la fecha no puede ser anterior a hoy
}

export interface TipoSolicitudDef {
  clave: TipoSolicitud
  icono: string
  titulo: string
  descripcion: string
  campos: CampoSolicitud[]
  detalleEtiqueta: string
  detallePlaceholder: string
  detalleRequerido: boolean
}

export const tiposSolicitud: TipoSolicitudDef[] = [
  {
    clave: 'cancha',
    icono: '🏟️',
    titulo: 'Reserva de cancha',
    descripcion: 'Agenda una cancha para entrenar o jugar un amistoso.',
    detalleEtiqueta: 'Observaciones',
    detallePlaceholder: 'Requerimientos especiales, árbitro, iluminación...',
    detalleRequerido: false,
    campos: [
      { id: 'sede', etiqueta: 'Sede', tipo: 'select', requerido: true, opciones: sedes.map((s) => s.nombre) },
      { id: 'equipo', etiqueta: 'Equipo solicitante', tipo: 'text', requerido: true, placeholder: 'Ej: Cracks FC' },
      { id: 'fecha', etiqueta: 'Fecha', tipo: 'date', requerido: true, fechaFutura: true },
      { id: 'hora', etiqueta: 'Hora de inicio', tipo: 'time', requerido: true },
      { id: 'duracion', etiqueta: 'Duración', tipo: 'select', requerido: true, opciones: ['1 hora', '2 horas', '3 horas'], ancho: 12 },
    ],
  },
  {
    clave: 'equipo',
    icono: '🛡️',
    titulo: 'Inscripción de equipo',
    descripcion: 'Inscribe a tu club en una de las series de la liga.',
    detalleEtiqueta: 'Comentarios',
    detallePlaceholder: 'Historia del club, colores, información relevante...',
    detalleRequerido: false,
    campos: [
      { id: 'nombreEquipo', etiqueta: 'Nombre del equipo', tipo: 'text', requerido: true, placeholder: 'Ej: Los Halcones FC' },
      { id: 'serie', etiqueta: 'Serie', tipo: 'select', requerido: true, opciones: categorias.map((c) => `Serie ${c}`) },
      { id: 'delegado', etiqueta: 'Delegado', tipo: 'text', requerido: true, placeholder: 'Nombre y apellido' },
      { id: 'telefono', etiqueta: 'Teléfono del delegado', tipo: 'tel', requerido: true, placeholder: '+56 9 1234 5678' },
      { id: 'jugadores', etiqueta: 'Cantidad de jugadores', tipo: 'number', requerido: true, min: 11, max: 30, placeholder: '16', ancho: 12 },
    ],
  },
  {
    clave: 'jugador',
    icono: '🏃',
    titulo: 'Inscripción de jugador',
    descripcion: 'Registra a un jugador en el plantel de un equipo.',
    detalleEtiqueta: 'Observaciones',
    detallePlaceholder: 'Lesiones, traspasos, información adicional...',
    detalleRequerido: false,
    campos: [
      { id: 'nombre', etiqueta: 'Nombre completo', tipo: 'text', requerido: true, placeholder: 'Ej: Juan Román' },
      { id: 'run', etiqueta: 'RUN (sin puntos ni guión)', tipo: 'text', requerido: true, placeholder: '19011022K', maxLength: 9, formato: 'run' },
      { id: 'equipo', etiqueta: 'Equipo', tipo: 'text', requerido: true, placeholder: 'Ej: Cracks FC' },
      { id: 'posicion', etiqueta: 'Posición', tipo: 'select', requerido: true, opciones: ['Portero', 'Defensa', 'Mediocampista', 'Delantero'] },
      { id: 'dorsal', etiqueta: 'Dorsal (#)', tipo: 'number', requerido: true, min: 1, max: 99, placeholder: '10', ancho: 12 },
    ],
  },
  {
    clave: 'entrenador',
    icono: '🧑‍🏫',
    titulo: 'Inscripción de entrenador',
    descripcion: 'Registra a un entrenador o miembro del cuerpo técnico.',
    detalleEtiqueta: 'Trayectoria',
    detallePlaceholder: 'Equipos anteriores, logros, formación...',
    detalleRequerido: false,
    campos: [
      { id: 'nombre', etiqueta: 'Nombre completo', tipo: 'text', requerido: true, placeholder: 'Ej: Marcelo Díaz' },
      { id: 'run', etiqueta: 'RUN (sin puntos ni guión)', tipo: 'text', requerido: true, placeholder: '19011022K', maxLength: 9, formato: 'run' },
      { id: 'equipo', etiqueta: 'Equipo', tipo: 'text', requerido: true, placeholder: 'Ej: Cracks FC' },
      { id: 'experiencia', etiqueta: 'Experiencia', tipo: 'select', requerido: true, opciones: ['Sin experiencia', '1 a 3 años', '4 a 6 años', '7 años o más'] },
      { id: 'certificacion', etiqueta: 'Certificación', tipo: 'select', requerido: true, opciones: ['Sin certificación', 'Básica', 'Avanzada'], ancho: 12 },
    ],
  },
  {
    clave: 'apelacion',
    icono: '⚖️',
    titulo: 'Apelación de sanción',
    descripcion: 'Impugna una resolución del Tribunal de Disciplina.',
    detalleEtiqueta: 'Fundamentos de la apelación',
    detallePlaceholder: 'Explica por qué la sanción debería revisarse...',
    detalleRequerido: true,
    campos: [
      { id: 'jugador', etiqueta: 'Jugador sancionado', tipo: 'text', requerido: true, placeholder: 'Ej: Juan Pérez' },
      { id: 'equipo', etiqueta: 'Equipo', tipo: 'text', requerido: true, placeholder: 'Ej: Cracks FC' },
      {
        id: 'acta',
        etiqueta: 'Acta',
        tipo: 'select',
        requerido: true,
        opciones: actas.map((a) => `Acta N° ${String(a.numero).padStart(2, '0')}`),
      },
      { id: 'sancion', etiqueta: 'Sanción recibida', tipo: 'text', requerido: true, placeholder: 'Ej: 2 Fechas' },
    ],
  },
  {
    clave: 'otro',
    icono: '📝',
    titulo: 'Otra solicitud',
    descripcion: 'Cualquier trámite que no esté en las opciones anteriores.',
    detalleEtiqueta: 'Detalle de tu solicitud',
    detallePlaceholder: 'Cuéntanos qué necesitas...',
    detalleRequerido: true,
    campos: [
      { id: 'asunto', etiqueta: 'Asunto', tipo: 'text', requerido: true, placeholder: 'Resumen en una línea', ancho: 12 },
    ],
  },
]

export function buscarTipo(clave: TipoSolicitud): TipoSolicitudDef {
  return tiposSolicitud.find((t) => t.clave === clave) ?? tiposSolicitud[tiposSolicitud.length - 1]
}

export const claseEstado: Record<EstadoSolicitud, string> = {
  Pendiente: 'bg-warning text-dark',
  Aprobada: 'bg-success',
  Rechazada: 'bg-danger',
}