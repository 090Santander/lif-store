import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import FormPartido from './FormPartido'

describe('Componente FormPartido (FormPartido.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe renderizar y enviar los datos del partido al hacer submit', () => {
    const onAgregar = jasmine.createSpy('onAgregar')
    const { container } = render(<FormPartido onAgregar={onAgregar} />)

    expect(screen.getByText('Agregar Nuevo Partido / Entrada')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('Equipo Local'), { target: { value: '  Cracks FC  ' } })
    fireEvent.change(screen.getByLabelText('Equipo Visitante'), { target: { value: '  Zánganos FC  ' } })
    fireEvent.change(screen.getByLabelText('Fecha / Texto'), { target: { value: '  SÁBADO 12 SEPT  ' } })
    fireEvent.change(screen.getByLabelText('Hora'), { target: { value: '  16:00 hrs  ' } })
    fireEvent.change(screen.getByLabelText('Sede'), { target: { value: '  Cancha 1  ' } })
    fireEvent.change(screen.getByLabelText('Fase / Categoría'), { target: { value: '  Gran Final  ' } })
    fireEvent.change(screen.getByLabelText('Precio Entrada ($)'), { target: { value: '5000' } })
    fireEvent.change(screen.getByLabelText('Descripción / Detalles'), { target: { value: '  Detalles aforo  ' } })

    fireEvent.submit(container.querySelector('form') as HTMLFormElement)

    expect(onAgregar).toHaveBeenCalledWith({
      equipoLocal: 'Cracks FC',
      equipoVisitante: 'Zánganos FC',
      fecha: 'SÁBADO 12 SEPT',
      hora: '16:00 hrs',
      sede: 'Cancha 1',
      fase: 'Gran Final',
      precio: 5000,
      descripcion: 'Detalles aforo',
    })
  })
})