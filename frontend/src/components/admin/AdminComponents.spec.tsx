import { render, screen, fireEvent } from '@testing-library/react'
import PanelSolicitudes from './PanelSolicitudes'

const mockSolicitud: any = {
  id: 1,
  tipo: 'reserva',
  estado: 'Pendiente',
  fecha: '2026-10-14',
  solicitante: 'admin@lif.cl',
  nombreSolicitante: 'Juan Pérez',
  datos: { asunto: 'Reserva Cancha 1' }
}

describe('PanelSolicitudes', () => {
  let onCambiarEstado: jasmine.Spy
  let onEliminar: jasmine.Spy

  beforeEach(() => {
    onCambiarEstado = jasmine.createSpy('onCambiarEstado')
    onEliminar = jasmine.createSpy('onEliminar')
  })

  function renderPanel(solicitudes = [mockSolicitud]) {
    return render(
      <PanelSolicitudes
        solicitudes={solicitudes}
        onCambiarEstado={onCambiarEstado}
        onEliminar={onEliminar}
      />
    )
  }

  it('debe aprobar una solicitud pendiente', () => {
    renderPanel()
    fireEvent.click(screen.getByRole('button', { name: /aprobar/i }))
    expect(onCambiarEstado).toHaveBeenCalledWith(1, 'Aprobada')
  })

  it('debe rechazar una solicitud pendiente', () => {
    renderPanel()
    fireEvent.click(screen.getByRole('button', { name: /rechazar/i }))
    expect(onCambiarEstado).toHaveBeenCalledWith(1, 'Rechazada')
  })

  it('debe eliminar solo si el usuario confirma', () => {
    const confirmSpy = spyOn(window, 'confirm').and.returnValue(true)
    renderPanel()
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(confirmSpy).toHaveBeenCalled()
    expect(onEliminar).toHaveBeenCalledWith(1)
  })

  it('no debe eliminar si el usuario cancela', () => {
    spyOn(window, 'confirm').and.returnValue(false)
    renderPanel()
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(onEliminar).not.toHaveBeenCalled()
  })

  it('no muestra aprobar/rechazar si la solicitud no está pendiente', () => {
    renderPanel([{ ...mockSolicitud, estado: 'Aprobada' }])
    fireEvent.click(screen.getByRole('button', { name: /^Aprobada/ })) // filtro
    expect(screen.queryByRole('button', { name: /aprobar/i })).toBeNull()
  })

  it('muestra el mensaje vacío sin solicitudes', () => {
    renderPanel([])
    expect(screen.getByText('No hay solicitudes en este estado.')).toBeTruthy()
  })
})