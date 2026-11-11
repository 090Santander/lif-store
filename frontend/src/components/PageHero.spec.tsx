import { render, screen } from '@testing-library/react'
import PageHero from './PageHero'

describe('PageHero Component', () => {
  it('debe renderizar la etiqueta, título y subtítulo correctamente', () => {
    render(
      <PageHero
        etiqueta="Torneo"
        titulo="Bienvenidos"
        subtitulo="Liga de fútbol"
      />
    )

    expect(screen.getByText('Torneo')).toBeTruthy()
    expect(screen.getByText('Bienvenidos')).toBeTruthy()
    expect(screen.getByText('Liga de fútbol')).toBeTruthy()
  })

  it('debe renderizar sin subtítulo cuando no se provee', () => {
    render(<PageHero etiqueta="Aviso" titulo="Aviso Importante" />)

    expect(screen.getByText('Aviso')).toBeTruthy()
    expect(screen.getByText('Aviso Importante')).toBeTruthy()
  })
})