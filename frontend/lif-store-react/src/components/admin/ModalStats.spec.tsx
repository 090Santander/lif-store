import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import ModalStats from './ModalStats'

describe('Componente ModalStats (ModalStats.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe renderizar los datos del jugador y guardar estadísticas', () => {
    const onGuardar = jasmine.createSpy('onGuardar')
    const onCerrar = jasmine.createSpy('onCerrar')
    const jugador = { id: 1, nombre: 'Carlos Pérez', equipo: 'Mónica FC', pj: 5, goles: 3, ta: 1, tr: 0 }

    const { container } = render(
      <ModalStats jugador={jugador as any} onGuardar={onGuardar} onCerrar={onCerrar} />
    )

    expect(screen.getByText('Carlos Pérez (Mónica FC)')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('Partidos jugados'), { target: { value: '8' } })
    fireEvent.change(screen.getByLabelText('Goles'), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('Tarjetas amarillas'), { target: { value: '2' } })
    fireEvent.change(screen.getByLabelText('Tarjetas rojas'), { target: { value: '1' } })

    fireEvent.submit(container.querySelector('form') as HTMLFormElement)

    expect(onGuardar).toHaveBeenCalledWith({
      pj: 8,
      goles: 5,
      ta: 2,
      tr: 1,
    })
  })

  it('debe llamar a onCerrar al hacer clic en Cancelar o en la X', () => {
    const onCerrar = jasmine.createSpy('onCerrar')
    const jugador = { id: 1, nombre: 'Carlos Pérez', equipo: 'Mónica FC' }

    render(<ModalStats jugador={jugador as any} onGuardar={() => {}} onCerrar={onCerrar} />)

    fireEvent.click(screen.getByText('Cancelar'))
    expect(onCerrar).toHaveBeenCalled()

    fireEvent.click(screen.getByLabelText('Cerrar'))
    expect(onCerrar).toHaveBeenCalledTimes(2)
  })
})