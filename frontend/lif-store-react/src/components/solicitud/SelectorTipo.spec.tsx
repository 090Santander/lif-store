import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import SelectorTipo from './SelectorTipo'
import type { TipoSolicitudDef } from '../../data/solicitud'
import type { TipoSolicitud } from '../../data/datosLIF'

const mockTipos = [
  {
    clave: 'transferencia',
    titulo: 'Solicitud de Transferencia',
    descripcion: 'Traspaso de jugador a otro club',
    icono: 'bi-arrow-left-right'
  },
  {
    clave: 'inscripcion',
    titulo: 'Inscripción de Jugador',
    descripcion: 'Registro de nuevo jugador',
    icono: 'bi-person-plus'
  }
] as unknown as TipoSolicitudDef[]

describe('Componente SelectorTipo (SelectorTipo.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe renderizar la lista de tipos de solicitud', () => {
    render(
      <SelectorTipo
        tipos={mockTipos}
        activa={'transferencia' as TipoSolicitud}
        onSeleccionar={jasmine.createSpy('onSeleccionar')}
      />
    )

    expect(screen.getByText(/Solicitud de Transferencia/i)).toBeTruthy()
    expect(screen.getByText(/Inscripción de Jugador/i)).toBeTruthy()
  })

  it('debe invocar onSeleccionar al hacer clic en una opción', () => {
    const onSeleccionarSpy = jasmine.createSpy('onSeleccionar')
    render(
      <SelectorTipo
        tipos={mockTipos}
        activa={'transferencia' as TipoSolicitud}
        onSeleccionar={onSeleccionarSpy}
      />
    )

    const boton =
      screen.getByText(/Inscripción de Jugador/i).closest('button') ||
      screen.getByText(/Inscripción de Jugador/i)

    fireEvent.click(boton)

    expect(onSeleccionarSpy).toHaveBeenCalledWith('inscripcion')
  })
})