import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Posiciones from './Posiciones'

describe('Página Posiciones (Posiciones.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe renderizar el componente Posiciones correctamente', () => {
    const { container } = render(
      <MemoryRouter>
        <Posiciones />
      </MemoryRouter>
    )

    expect(container).toBeTruthy()
  })
})