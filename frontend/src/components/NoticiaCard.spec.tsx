import { render, screen } from '@testing-library/react'
import type { ComponentProps } from 'react'
import { MemoryRouter } from 'react-router'
import NoticiaCard from './NoticiaCard'

type Props = ComponentProps<typeof NoticiaCard>

describe('NoticiaCard Component', () => {
  it('debe renderizar la tarjeta de noticia', () => {
    const noticia = {
      id: 'n1',
      titulo: 'Gran Final este fin de semana',
      resumen: 'Se definen los campeones',
      fecha: '2026-10-10',
      imagen: 'noticia.jpg',
    } as unknown as Props['noticia']

    render(
      <MemoryRouter>
        <NoticiaCard noticia={noticia} />
      </MemoryRouter>
    )

    expect(screen.getByText('Gran Final este fin de semana')).toBeTruthy()
  })
})