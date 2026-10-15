import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import FormNoticia from './FormNoticia'

describe('Componente FormNoticia (FormNoticia.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe renderizar y enviar los datos de la noticia al hacer submit', () => {
    const onAgregar = jasmine.createSpy('onAgregar')
    const { container } = render(
      <FormNoticia
        prefijo="n"
        titulo="Nueva Noticia"
        categorias={['Torneo', 'General']}
        placeholders={{ titulo: 'Título...', fecha: '12 oct', resumen: 'Resumen...' }}
        textoBoton="Publicar Noticia"
        onAgregar={onAgregar}
      />
    )

    expect(screen.getByText('Nueva Noticia')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('Título de la Noticia'), { target: { value: '  Gran Final  ' } })
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Torneo' } })
    fireEvent.change(screen.getByLabelText('Fecha / Tiempo'), { target: { value: '  15 oct  ' } })
    fireEvent.change(screen.getByLabelText('Resumen / Contenido'), { target: { value: '  Se jugará la final  ' } })

    fireEvent.submit(container.querySelector('form') as HTMLFormElement)

    expect(onAgregar).toHaveBeenCalledWith({
      titulo: 'Gran Final',
      categoria: 'Torneo',
      fecha: '15 oct',
      resumen: 'Se jugará la final',
    })
  })
})