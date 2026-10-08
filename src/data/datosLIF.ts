export interface Noticia {
  id: number
  titulo: string
  resumen?: string
  contenido?: string
  extracto?: string
  categoria?: string
  fecha?: string
  tiempo?: string
  destacada?: boolean
}

export interface Partido {
  id: number
  equipoLocal?: string
  local?: string
  equipoVisitante?: string
  visita?: string
  precio?: number
  fase?: string
  fecha?: string
  hora?: string
  sede?: string
}

export interface Jugador {
  id: number
  nombre: string
  posicion?: string
  equipo?: string
  dorsal?: number
  pj?: number
  goles?: number
  ta?: number
  tr?: number
}

export interface Solicitud {
  id: number
  [campo: string]: unknown
}

export interface Usuario {
  rol: string // 'admin' u otros; lo afinamos cuando migremos login/registro
  [campo: string]: unknown
}

export type ClaveColeccion = 'noticias' | 'jugadores' | 'partidos' | 'solicitudes'

const CLAVE_USUARIO = 'LIF_USUARIO_ACTIVO'

function init(): void {
  const claves: ClaveColeccion[] = ['noticias', 'jugadores', 'partidos', 'solicitudes']
  claves.forEach((clave) => {
    if (!localStorage.getItem(`lif_${clave}`)) {
      localStorage.setItem(`lif_${clave}`, JSON.stringify([]))
    }
  })
}

function get<T>(clave: ClaveColeccion): T[] {
  const raw = localStorage.getItem(`lif_${clave}`)
  return raw ? (JSON.parse(raw) as T[]) : []
}

function guardar<T>(clave: ClaveColeccion, lista: T[]): void {
  localStorage.setItem(`lif_${clave}`, JSON.stringify(lista))
}

function agregar<T extends object>(clave: ClaveColeccion, item: T): T & { id: number } {
  const lista = get<T & { id: number }>(clave)
  const nuevo = { ...item, id: Date.now() } // ID único basado en la hora
  lista.push(nuevo)
  guardar(clave, lista)
  return nuevo
}

function eliminar(clave: ClaveColeccion, id: number): void {
  const lista = get<{ id: number }>(clave).filter((item) => item.id !== id)
  guardar(clave, lista)
}

// --- Sesión de usuario ---
function setUsuario(usuario: Usuario): void {
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario))
}

function getUsuario(): Usuario | null {
  const raw = localStorage.getItem(CLAVE_USUARIO)
  return raw ? (JSON.parse(raw) as Usuario) : null
}

function cerrarSesion(): void {
  localStorage.removeItem(CLAVE_USUARIO)
}

export const DatosLIF = {
  init,
  get,
  guardar,
  agregar,
  eliminar,
  setUsuario,
  getUsuario,
  cerrarSesion,
}

DatosLIF.init()