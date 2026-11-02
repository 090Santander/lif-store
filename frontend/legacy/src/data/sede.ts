export interface Sede {
  id: string
  icono: string
  pestana: string
  etiqueta: string
  claseEtiqueta: string
  nombre: string
  direccion: string
  descripcion: string
  servicios: string[]
  claseBoton: string
  enlaceMapa: string
  mapaEmbed: string
  tituloMapa: string
  invertida: boolean
}

export const sedes: Sede[] = [
  {
    id: 'principal',
    icono: '🏟️',
    pestana: 'Sede Principal',
    etiqueta: 'Sede Oficial LIF',
    claseEtiqueta: 'bg-success',
    nombre: 'Complejo Deportivo Principal',
    direccion: 'Av. Las Industrias, San Joaquín.',
    descripcion:
      'Nuestra sede matriz cuenta con 3 canchas de pasto sintético certificadas con estándar FIFA, graderías techadas con capacidad para 500 espectadores e iluminación LED de última generación para partidos nocturnos.',
    servicios: [
      '🚗 Estacionamiento Privado',
      '🚿 Camarines con Agua Caliente',
      '🍔 Casino y Cafetería',
      '🚑 Primeros Auxilios',
    ],
    claseBoton: 'btn-success',
    enlaceMapa: 'https://maps.google.com/?q=San+Joaquin+Santiago+Chile',
    mapaEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26615.11162386903!2d-70.639148!3d-33.498844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cffd37173e35%3A0xc3c544d673ea93cb!2sSan%20Joaqu%C3%ADn%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl',
    tituloMapa: 'Mapa Sede Principal',
    invertida: false,
  },
  {
    id: 'norte',
    icono: '🥅',
    pestana: 'Sede Norte',
    etiqueta: 'Sede Alternativa',
    claseEtiqueta: 'bg-secondary',
    nombre: 'Canchas Norte FC',
    direccion: 'Av. Independencia, Sector Norte.',
    descripcion:
      'Sede tradicional utilizada principalmente para las series Junior, Femenina y partidos amistosos. Destaca por mantener 2 canchas de pasto natural en excelente estado y un ambiente familiar.',
    servicios: ['🚗 Estacionamiento Público', '🚿 Camarines Básicos', '🥤 Kiosco'],
    claseBoton: 'btn-secondary',
    enlaceMapa: 'https://maps.google.com/?q=Independencia+Santiago+Chile',
    mapaEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26636.564753738097!2d-70.6698182!3d-33.4150821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5e533087027%3A0x868d40049964e590!2sIndependencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl',
    tituloMapa: 'Mapa Sede Norte',
    invertida: true,
  },
]