import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import MisSolicitudes from './MisSolicitudes'
import type { Solicitud } from '../../data/datosLIF'

const mockSolicitudes: Solicitud[] = [
  {
    id: 1,
    tipo: 'transferencia',
    tipoId: 'transferencia',
    fecha: '15/10/2026',
    estado: 'Pendiente',
    detalle: 'Prueba de solicitud pendiente',
    datos: {
      rutJugador: '12.345.678-9',
      clubOrigen: 'Club A'
    }
  },
  {
    id: 2,
    tipo: 'transferencia',
    tipoId: 'transferencia',
    fecha: '16/10/2026',
    estado: 'Aprobada',
    detalle: 'Prueba de solicitud aprobada',
    datos: {
      rutJugador: '98.765.432-1',
      clubOrigen: 'Club B'
    }
  }
] as unknown as Solicitud[]

describe('Componente MisSolicitudes (MisSolicitudes.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe mostrar el mensaje vacío cuando la lista no tiene elementos', () => {
    render(<MisSolicitudes solicitudes={[]} onCancelar={jasmine.createSpy('onCancelar')} />)
    expect(screen.getByText(/Aún no has enviado solicitudes/i)).toBeTruthy()
  })

  it('debe renderizar el botón de cancelar únicamente en solicitudes con estado Pendiente', () => {
    render(<MisSolicitudes solicitudes={mockSolicitudes} onCancelar={jasmine.createSpy('onCancelar')} />)
    const botones = screen.getAllByRole('button', { name: /cancelar solicitud/i })
    expect(botones.length).toBe(1)
  })

  it('debe ejecutar onCancelar con el id correcto si el usuario confirma', () => {
    const onCancelarSpy = jasmine.createSpy('onCancelar')
    spyOn(window, 'confirm').and.returnValue(true)

    render(<MisSolicitudes solicitudes={mockSolicitudes} onCancelar={onCancelarSpy} />)

    const botonCancelar = screen.getByRole('button', { name: /cancelar solicitud/i })
    fireEvent.click(botonCancelar)

    expect(window.confirm).toHaveBeenCalledWith('¿Cancelar esta solicitud?')
    expect(onCancelarSpy).toHaveBeenCalledWith(1)
  })

  it('no debe llamar a onCancelar si el usuario cancela la ventana de confirmación', () => {
    const onCancelarSpy = jasmine.createSpy('onCancelar')
    spyOn(window, 'confirm').and.returnValue(false)

    render(<MisSolicitudes solicitudes={mockSolicitudes} onCancelar={onCancelarSpy} />)

    const botonCancelar = screen.getByRole('button', { name: /cancelar solicitud/i })
    fireEvent.click(botonCancelar)

    expect(onCancelarSpy).not.toHaveBeenCalled()
  })
})