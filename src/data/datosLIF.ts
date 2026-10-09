export interface Noticia {
  id: number
  titulo: string
  categoria: string
  fecha: string
  resumen: string
  destacada?: boolean
}

export interface Partido {
  id: number
  equipoLocal: string
  equipoVisitante: string
  fecha: string
  hora: string
  sede: string
  fase: string
  precio: number
  descripcion?: string
  estado?: string
  golesLocal?: number
  golesVisita?: number
}

export interface Jugador {
  id: number
  nombre: string
  equipo: string
  posicion: string
  dorsal: string
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
  nombre: string
  correo: string
  rol: 'admin' | 'usuario'
}

export type ClaveColeccion = 'noticias' | 'jugadores' | 'partidos' | 'solicitudes' | 'usuarios'

const CLAVE_USUARIO = 'LIF_USUARIO_ACTIVO'

function init(): void {
  const claves: ClaveColeccion[] = ['noticias', 'jugadores', 'partidos', 'solicitudes', 'usuarios']
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