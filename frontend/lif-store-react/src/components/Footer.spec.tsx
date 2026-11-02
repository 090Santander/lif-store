import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Footer from './Footer'

describe('Footer Component', () => {
  it('debe renderizar el pie de página correctamente', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText(/Liga Independiente de Fútbol/i)).toBeTruthy()
  })
})