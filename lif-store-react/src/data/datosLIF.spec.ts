import { DatosLIF } from './datosLIF'

describe('DatosLIF Data Module', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('debe gestionar el usuario en localStorage', () => {
    const usuarioPrueba = { nombre: 'Test', correo: 'test@lif.cl', rol: 'usuario' as const }
    DatosLIF.setUsuario(usuarioPrueba)

    const usuario = DatosLIF.getUsuario()
    expect(usuario?.correo).toBe('test@lif.cl')

    DatosLIF.limpiarUsuario()
    expect(DatosLIF.getUsuario()).toBeNull()
  })
})