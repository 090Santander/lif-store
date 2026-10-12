import { render, screen } from '@testing-library/react'
import PageHero from './PageHero'

describe('PageHero Component', () => {
  it('debe renderizar título y subtítulo', () => {
    render(<PageHero titulo="Bienvenidos" subtitulo="Liga de fútbol" />)
    expect(screen.getByText('Bienvenidos')).toBeTruthy()
    expect(screen.getByText('Liga de fútbol')).toBeTruthy()
  })
})