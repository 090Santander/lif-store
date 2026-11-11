import { render } from '@testing-library/react'
import FormSolicitud from './FormSolicitud'
import MisSolicitudes from './MisSolicitudes'
import SelectorTipo from './SelectorTipo'
import TarjetaSolicitud from './TarjetaSolicitud'

describe('Suite de Pruebas de Componentes Solicitud', () => {
  const mockDef: any = {
    clave: 'reserva',
    titulo: 'Reserva de Cancha',
    campos: [
      { id: 'asunto', etiqueta: 'Asunto', tipo: 'text' },
      { id: 'cancha', etiqueta: 'Cancha', tipo: 'select', opciones: ['Cancha 1'] }
    ],
    detalleRequerido: false
  }

  const mockSolicitud: any = {
    id: 1,
    tipo: 'reserva',
    estado: 'Pendiente',
    fecha: '2026-10-14T00:00:00.000Z',
    solicitante: 'admin@lif.cl',
    nombreSolicitante: 'Juan Pérez',
    detalle: 'Detalle test',
    datos: { asunto: 'Reserva Cancha', cancha: 'Cancha 1' }
  }

  const dummyProps: any = {
    def: mockDef,
    tipos: [mockDef],
    solicitud: mockSolicitud,
    solicitudes: [mockSolicitud],
    usuario: { correo: 'admin@lif.cl', nombre: 'Juan Pérez' },
    onSubmit: () => {},
    onCancelar: () => {},
    onChange: () => {},
    onSelect: () => {}
  }

  it('debe renderizar FormSolicitud', () => {
    const Component = FormSolicitud as any
    const { container } = render(<Component {...dummyProps} />)
    expect(container).toBeTruthy()
  })

  it('debe renderizar MisSolicitudes', () => {
    const Component = MisSolicitudes as any
    const { container } = render(<Component {...dummyProps} />)
    expect(container).toBeTruthy()
  })

  it('debe renderizar SelectorTipo', () => {
    const Component = SelectorTipo as any
    const { container } = render(<Component {...dummyProps} />)
    expect(container).toBeTruthy()
  })

  it('debe renderizar TarjetaSolicitud', () => {
    const Component = TarjetaSolicitud as any
    const { container } = render(<Component {...dummyProps} def={mockDef} />)
    expect(container).toBeTruthy()
  })
})