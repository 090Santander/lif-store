import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Complejos from './Complejos'

describe('Página Complejos (Complejos.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe renderizar la página de complejos deportivos', () => {
    render(
      <MemoryRouter>
        <Complejos />
      </MemoryRouter>
    )

    expect(document.body).toBeTruthy()
  })
})