import { render, screen, fireEvent } from '@testing-library/react'
import { CarritoProvider, useCarrito } from './CarritoContext'

const ComponentePrueba = () => {
  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    obtenerTotal,
    obtenerCantidadTotal,
  } = useCarrito()

  return (
    <div>
      <span data-testid="cantidad">{obtenerCantidadTotal()}</span>
      <span data-testid="total">{obtenerTotal()}</span>
      <button
        onClick={() =>
          agregarAlCarrito({ id: 1, nombre: 'Entrada Final', precio: 5000, cantidad: 1 })
        }
      >
        Agregar
      </button>
      <button onClick={() => eliminarDelCarrito(1)}>Eliminar</button>
      <button onClick={() => vaciarCarrito()}>Vaciar</button>
      <ul>
        {carrito.map((item) => (
          <li key={item.id}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  )
}

const ComponenteError = () => {
  useCarrito()
  return <div>No renderizar</div>
}

describe('CarritoContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('debe agregar un item al carrito y calcular la cantidad y el total', () => {
    render(
      <CarritoProvider>
        <ComponentePrueba />
      </CarritoProvider>
    )

    expect(screen.getByTestId('cantidad').textContent).toBe('0')

    fireEvent.click(screen.getByText('Agregar'))

    expect(screen.getByTestId('cantidad').textContent).toBe('1')
    expect(screen.getByTestId('total').textContent).toBe('5000')
    expect(screen.getByText('Entrada Final')).toBeTruthy()
  })

  it('debe incrementar la cantidad si el item ya existe en el carrito', () => {
    render(
      <CarritoProvider>
        <ComponentePrueba />
      </CarritoProvider>
    )

    fireEvent.click(screen.getByText('Agregar'))
    fireEvent.click(screen.getByText('Agregar'))

    expect(screen.getByTestId('cantidad').textContent).toBe('2')
    expect(screen.getByTestId('total').textContent).toBe('10000')
  })

  it('debe eliminar un item del carrito', () => {
    render(
      <CarritoProvider>
        <ComponentePrueba />
      </CarritoProvider>
    )

    fireEvent.click(screen.getByText('Agregar'))
    expect(screen.getByTestId('cantidad').textContent).toBe('1')

    fireEvent.click(screen.getByText('Eliminar'))
    expect(screen.getByTestId('cantidad').textContent).toBe('0')
  })

  it('debe vaciar el carrito completamente', () => {
    render(
      <CarritoProvider>
        <ComponentePrueba />
      </CarritoProvider>
    )

    fireEvent.click(screen.getByText('Agregar'))
    fireEvent.click(screen.getByText('Vaciar'))

    expect(screen.getByTestId('cantidad').textContent).toBe('0')
  })

  it('debe cargar datos desde localStorage si existen', () => {
    const itemGuardado = [{ id: 99, nombre: 'Ticket Guardado', precio: 3000, cantidad: 1 }]
    localStorage.setItem('carrito_lif', JSON.stringify(itemGuardado))

    render(
      <CarritoProvider>
        <ComponentePrueba />
      </CarritoProvider>
    )

    expect(screen.getByText('Ticket Guardado')).toBeTruthy()
    expect(screen.getByTestId('total').textContent).toBe('3000')
  })

  it('debe ignorar un carrito guardado con JSON dañado', () => {
    localStorage.setItem('carrito_lif', 'esto no es json')

    render(
      <CarritoProvider>
        <ComponentePrueba />
      </CarritoProvider>
    )

    expect(screen.getByTestId('cantidad').textContent).toBe('0')
  })

  it('debe lanzar un error si useCarrito se usa fuera de CarritoProvider', () => {
    spyOn(console, 'error')
    expect(() => render(<ComponenteError />)).toThrowError(
      'useCarrito debe ser usado dentro de un CarritoProvider'
    )
  })
})