import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Posiciones from './Posiciones'

describe('Página Posiciones (Posiciones.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe renderizar la página de posiciones correctamente', () => {
    render(
      <MemoryRouter>
        <Posiciones />
      </MemoryRouter>
    )

    expect(screen.getByText(/posiciones/i)).toBeTruthy()
  })
})