import {
  fechaHoyISO,
  valoresIniciales,
  validarSolicitud,
  crearSolicitud,
  folioDe,
  describirDatos
} from './solicitudes'

describe('Utilidades de Solicitudes (solicitudes.ts)', () => {
  const definicionMock: any = {
    clave: 'inscripcion',
    titulo: 'Inscripción de Equipo',
    campos: [
      { id: 'equipo', etiqueta: 'Nombre del Equipo', tipo: 'text', requerido: true },
      { id: 'categoria', etiqueta: 'Categoría', tipo: 'select', opciones: ['Honor', 'Ascenso'] },
      { id: 'runRepresentante', etiqueta: 'RUN Representante', tipo: 'text', formato: 'run', requerido: true },
      { id: 'monto', etiqueta: 'Monto Inscripción', tipo: 'number', min: 1000, max: 50000, requerido: true },
      { id: 'fechaPreferida', etiqueta: 'Fecha Partido', tipo: 'date', fechaFutura: true }
    ],
    detalleRequerido: true,
    detalleEtiqueta: 'Motivo'
  }

  it('debe obtener los valores iniciales para un formulario de solicitud', () => {
    const valores = valoresIniciales(definicionMock)
    expect(valores.equipo).toBe('')
    expect(valores.categoria).toBe('Honor')
  })

  it('debe validar requerimientos y formatos en las solicitudes', () => {
    // Caso con errores de formato, límites y requeridos
    const errores = validarSolicitud(
      definicionMock,
      {
        equipo: '',
        runRepresentante: '123',
        monto: '500',
        fechaPreferida: '2020-01-01'
      },
      '',
      '2026-10-14'
    )

    expect(errores.equipo).toContain('obligatorio')
    expect(errores.runRepresentante).toBeTruthy()
    expect(errores.monto).toBeTruthy()
    expect(errores.fechaPreferida).toBeTruthy()
    expect(errores.detalle).toBeTruthy()

    // Caso exitoso sin errores
    const sinErrores = validarSolicitud(
      definicionMock,
      {
        equipo: 'Deportivo Macul',
        runRepresentante: '190000000',
        monto: '5000',
        fechaPreferida: '2027-01-01'
      },
      'Motivo de prueba',
      '2026-10-14'
    )
    expect(Object.keys(sinErrores)).toHaveSize(0)

    // Ramas de número no válido (NaN) y número superior al máximo
    const erroresExtra = validarSolicitud(definicionMock, { monto: 'abc' }, 'Motivo', '2026-10-14')
    expect(erroresExtra.monto).toBe('Ingresa un número válido.')

    const erroresMax = validarSolicitud(definicionMock, { monto: '999999' }, 'Motivo', '2026-10-14')
    expect(erroresMax.monto).toBeTruthy()
  })

  it('debe estructurar y crear el objeto de nueva solicitud', () => {
    expect(folioDe(10045)).toBe('SOL-10045')

    const usuarioMock: any = { correo: 'capitan@macul.cl', nombre: 'Carlos Capitán' }
    const solicitud = crearSolicitud(
      definicionMock,
      { equipo: 'Deportivo Macul' },
      'Solicitamos cupo',
      usuarioMock
    )

    expect(solicitud.tipo).toBe('inscripcion')
    expect(solicitud.solicitante).toBe('capitan@macul.cl')
    expect(solicitud.estado).toBe('Pendiente')
    expect(fechaHoyISO()).toBeTruthy()
  })

  it('debe retornar lista descrita de pares etiqueta/valor para previsualización', () => {
    const datos = { equipo: 'Deportivo Macul', categoria: 'Honor' }
    const descripcion = describirDatos(definicionMock, datos)

    expect(descripcion).toEqual([
      { etiqueta: 'Nombre del Equipo', valor: 'Deportivo Macul' },
      { etiqueta: 'Categoría', valor: 'Honor' }
    ])
  })
})