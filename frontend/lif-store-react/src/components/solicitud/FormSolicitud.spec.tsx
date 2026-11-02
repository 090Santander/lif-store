import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import FormSolicitud from './FormSolicitud'
import type { TipoSolicitudDef } from '../../data/solicitud'

const mockDefCompleto = {
  clave: 'transferencia',
  titulo: 'Solicitud de Transferencia',
  descripcion: 'Permite solicitar la transferencia de un jugador',
  detalleEtiqueta: 'Motivo de la solicitud',
  detalleRequerido: true,
  detallePlaceholder: 'Ingrese el motivo...',
  icono: 'bi-arrow-left-right',
  campos: [
    {
      id: 'rutJugador',
      etiqueta: 'RUT Jugador',
      tipo: 'text',
      requerido: true,
      placeholder: '12.345.678-9',
      ancho: 6
    },
    {
      id: 'clubOrigen',
      etiqueta: 'Club de Origen',
      tipo: 'select',
      requerido: true,
      opciones: ['Club A', 'Club B'],
      ancho: 6
    }
  ]
} as unknown as TipoSolicitudDef

const mockDefFallbacks = {
  clave: 'general',
  titulo: 'Solicitud General',
  descripcion: 'Solicitud básica',
  detalleEtiqueta: 'Detalles generales',
  detalleRequerido: false,
  detallePlaceholder: 'Ingrese detalle...',
  icono: 'bi-file-text',
  campos: [
    {
      id: 'categoria',
      etiqueta: 'Categoría',
      tipo: 'select',
      requerido: false
    }
  ]
} as unknown as TipoSolicitudDef

describe('Componente FormSolicitud (FormSolicitud.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe renderizar todos los campos definidos y el textarea de detalle', () => {
    render(<FormSolicitud def={mockDefCompleto} onEnviar={jasmine.createSpy('onEnviar')} />)

    expect(screen.getByLabelText(/RUT Jugador/i)).toBeTruthy()
    expect(screen.getByLabelText(/Club de Origen/i)).toBeTruthy()
    expect(screen.getByLabelText(/Motivo de la solicitud/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /enviar solicitud/i })).toBeTruthy()
  })

  it('debe evaluar los fallbacks por defecto para ancho de columna y opciones vacías', () => {
    render(<FormSolicitud def={mockDefFallbacks} onEnviar={jasmine.createSpy('onEnviar')} />)

    const select = screen.getByLabelText(/Categoría/i) as HTMLSelectElement
    expect(select).toBeTruthy()
    expect(select.options.length).toBe(0)
  })

  it('debe actualizar el estado interno al cambiar campos de texto, select y textarea', () => {
    render(<FormSolicitud def={mockDefCompleto} onEnviar={jasmine.createSpy('onEnviar')} />)

    const inputRut = screen.getByLabelText(/RUT Jugador/i) as HTMLInputElement
    const selectClub = screen.getByLabelText(/Club de Origen/i) as HTMLSelectElement
    const textareaDetalle = screen.getByLabelText(/Motivo de la solicitud/i) as HTMLTextAreaElement

    fireEvent.change(inputRut, { target: { value: '19.876.543-2' } })
    fireEvent.change(selectClub, { target: { value: 'Club A' } })
    fireEvent.change(textareaDetalle, { target: { value: 'Motivo de prueba en detalle' } })

    expect(inputRut.value).toBe('19.876.543-2')
    expect(selectClub.value).toBe('Club A')
    expect(textareaDetalle.value).toBe('Motivo de prueba en detalle')
  })

  it('no debe llamar a onEnviar cuando la validación falla', () => {
    const onEnviarSpy = jasmine.createSpy('onEnviar')
    render(<FormSolicitud def={mockDefCompleto} onEnviar={onEnviarSpy} />)

    const botonEnviar = screen.getByRole('button', { name: /enviar solicitud/i })
    fireEvent.click(botonEnviar)

    expect(onEnviarSpy).not.toHaveBeenCalled()
  })

  it('debe invocar onEnviar y reiniciar el formulario cuando todos los campos sean válidos', () => {
    const onEnviarSpy = jasmine.createSpy('onEnviar')
    render(<FormSolicitud def={mockDefCompleto} onEnviar={onEnviarSpy} />)

    const inputRut = screen.getByLabelText(/RUT Jugador/i)
    const selectClub = screen.getByLabelText(/Club de Origen/i)
    const textareaDetalle = screen.getByLabelText(/Motivo de la solicitud/i)

    fireEvent.change(inputRut, { target: { value: '19.876.543-2' } })
    fireEvent.change(selectClub, { target: { value: 'Club A' } })
    fireEvent.change(textareaDetalle, { target: { value: 'Motivo válido de prueba' } })

    const botonEnviar = screen.getByRole('button', { name: /enviar solicitud/i })
    fireEvent.click(botonEnviar)

    expect(onEnviarSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        rutJugador: '19.876.543-2',
        clubOrigen: 'Club A'
      }),
      'Motivo válido de prueba'
    )

    expect((screen.getByLabelText(/Motivo de la solicitud/i) as HTMLTextAreaElement).value).toBe('')
  })
})