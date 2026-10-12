import { validarEmail, validarPassword } from './validaciones'

describe('Validaciones Utils', () => {
  it('debe validar correos electrónicos', () => {
    expect(validarEmail('usuario@dominio.cl')).toBeTrue()
    expect(validarEmail('invalido')).toBeFalse()
  })

  it('debe validar contraseñas', () => {
    expect(validarPassword('123456')).toBeTrue()
    expect(validarPassword('123')).toBeFalse()
  })
})