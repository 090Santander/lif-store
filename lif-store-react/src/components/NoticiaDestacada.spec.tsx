import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import NoticiaDestacada from './NoticiaDestacada'

describe('NoticiaDestacada Component', () => {
  it('debe renderizar la noticia destacada', () => {
    const noticia = {
      id: 'nd1',
      titulo: 'Comienza el Torneo Clausura',
      resumen: 'Inscripciones abiertas',
      fecha: '2026-10-12',
      imagen: 'destacada.jpg'
    }

    render(
      <MemoryRouter>
        <NoticiaDestacada noticia={noticia} />
      </MemoryRouter>
    )
    expect(screen.getByText('Comienza el Torneo Clausura')).toBeTruthy()
  })
})