import type { Noticia } from '../data/datosLIF'

export function resumirNoticia(n: Noticia) {
  return {
    titulo: n.titulo || 'Noticia LIF',
    cuerpo: n.resumen || 'Sin descripción disponible.',
    categoria: n.categoria || 'Oficial',
    fecha: n.fecha || 'Reciente',
  }
}
