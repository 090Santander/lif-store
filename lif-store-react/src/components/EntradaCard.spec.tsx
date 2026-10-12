import { render, screen } from '@testing-library/react'
import SedeCard from './SedeCard'
import type { Sede } from '../data/sede'

const sedeBase = {
  nombre: 'Complejo Deportivo Norte',
  direccion: 'Av. Principal 123, Santiago',
  etiqueta: 'Sede Principal',
  claseEtiqueta: 'bg-success',
  descripcion: 'Canchas de pasto sintético y camarines.',
  servicios: ['Estacionamiento', 'Camarines'],
  enlaceMapa: 'https://maps.example.com/norte',
  claseBoton: 'btn-success',
  mapaEmbed: 'about:blank', // evita cargar un mapa real durante el test
  tituloMapa: 'Mapa Complejo Norte',
  invertida: false,
} as Sede

describe('SedeCard', () => {
  it('muestra nombre, dirección, etiqueta y descripción', () => {
    render(<SedeCard sede={sedeBase} />)

    expect(screen.getByText('Complejo Deportivo Norte')).toBeTruthy()
    expect(screen.getByText(/Av\. Principal 123/)).toBeTruthy()
    expect(screen.getByText('Sede Principal')).toBeTruthy()
    expect(screen.getByText('Canchas de pasto sintético y camarines.')).toBeTruthy()
  })

  it('lista cada servicio disponible', () => {
    render(<SedeCard sede={sedeBase} />)

    expect(screen.getByText('Estacionamiento')).toBeTruthy()
    expect(screen.getByText('Camarines')).toBeTruthy()
  })

  it('enlaza al mapa en una pestaña nueva', () => {
    render(<SedeCard sede={sedeBase} />)

    const enlace = screen.getByRole('link', { name: /Cómo llegar/i })
    expect(enlace.getAttribute('href')).toBe('https://maps.example.com/norte')
    expect(enlace.getAttribute('target')).toBe('_blank')
  })

  it('incluye el mapa embebido con su título accesible', () => {
    render(<SedeCard sede={sedeBase} />)

    expect(screen.getByTitle('Mapa Complejo Norte')).toBeTruthy()
  })

  it('invierte el orden de columnas cuando invertida es true', () => {
    const { container, rerender } = render(<SedeCard sede={sedeBase} />)
    expect(container.querySelector('.flex-lg-row-reverse')).toBeNull()

    rerender(<SedeCard sede={{ ...sedeBase, invertida: true }} />)
    expect(container.querySelector('.flex-lg-row-reverse')).not.toBeNull()
  })
})