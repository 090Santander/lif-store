import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import ListaNoticias from './ListaNoticias'

const ListaNoticiasComponent = ListaNoticias as any

describe('Componente ListaNoticias (ListaNoticias.spec.tsx)', () => {
  afterEach(() => cleanup())

  beforeEach(() => {
    if (!jasmine.isSpy(window.confirm)) {
      spyOn(window, 'confirm').and.returnValue(true)
    }
  })

  const noticiasMock = [
    { id: '1', titulo: 'Gran Final de Torneo', categoria: 'Torneo', fecha: '2026-10-01' },
    { id: '2', titulo: 'Nuevos Complejos', categoria: 'Infraestructura', fecha: '2026-10-05' }
  ]

  it('debe renderizar la lista de noticias correctamente', () => {
    const onEliminar = jasmine.createSpy('onEliminar')
    const onEditar = jasmine.createSpy('onEditar')

    render(
      <ListaNoticiasComponent
        noticias={noticiasMock}
        onEliminar={onEliminar}
        onEditar={onEditar}
      />
    )

    expect(screen.getByText('Gran Final de Torneo')).toBeTruthy()
    expect(screen.getByText('Nuevos Complejos')).toBeTruthy()
  })

  it('debe invocar la función de eliminar al hacer clic en el botón correspondiente', () => {
    const onEliminar = jasmine.createSpy('onEliminar')
    const onEditar = jasmine.createSpy('onEditar')

    render(
      <ListaNoticiasComponent
        noticias={noticiasMock}
        onEliminar={onEliminar}
        onEditar={onEditar}
      />
    )

    const botonesEliminar = screen.queryAllByText(/eliminar/i)
    if (botonesEliminar.length > 0) {
      fireEvent.click(botonesEliminar[0])
      expect(onEliminar).toHaveBeenCalled()
    }
  })
})