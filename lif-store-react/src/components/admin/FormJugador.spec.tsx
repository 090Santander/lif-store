import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import FormJugador from './FormJugador'

describe('Componente FormJugador (FormJugador.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe renderizar los campos y el botón de guardado', () => {
    render(<FormJugador onAgregar={() => {}} />)
    expect(screen.getByText('Registrar Nuevo Jugador')).toBeTruthy()
    expect(screen.getByLabelText('Nombre Completo')).toBeTruthy()
    expect(screen.getByLabelText('Equipo')).toBeTruthy()
    expect(screen.getByLabelText('Posición')).toBeTruthy()
    expect(screen.getByLabelText('Dorsal (#)')).toBeTruthy()
    expect(screen.getByText('Guardar Jugador')).toBeTruthy()
  })

  it('debe enviar los datos limpios (sin espacios) y reiniciar el formulario', () => {
    const onAgregar = jasmine.createSpy('onAgregar')
    const { container } = render(<FormJugador onAgregar={onAgregar} />)

    fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: '  Juan Román  ' } })
    fireEvent.change(screen.getByLabelText('Equipo'), { target: { value: ' Cracks FC ' } })
    fireEvent.change(screen.getByLabelText('Posición'), { target: { value: 'Defensa' } })
    fireEvent.change(screen.getByLabelText('Dorsal (#)'), { target: { value: '10' } })
    // fireEvent.submit evita depender de la validación nativa del navegador
    fireEvent.submit(container.querySelector('form') as HTMLFormElement)

    expect(onAgregar).toHaveBeenCalledOnceWith({
      nombre: 'Juan Román',
      equipo: 'Cracks FC',
      posicion: 'Defensa',
      dorsal: '10',
    })
    expect((screen.getByLabelText('Nombre Completo') as HTMLInputElement).value).toBe('')
    expect((screen.getByLabelText('Equipo') as HTMLInputElement).value).toBe('')
    expect((screen.getByLabelText('Dorsal (#)') as HTMLInputElement).value).toBe('')
    expect((screen.getByLabelText('Posición') as HTMLSelectElement).value).toBe('Portero') // vuelve a la posición por defecto
  })
})