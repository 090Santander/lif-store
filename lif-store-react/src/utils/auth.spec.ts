import {
  validarRun,
  validarCorreo,
  validarTexto,
  validarClave,
  validarConfirmacion,
  validarRegistro
} from './validaciones'

describe('Utilidades de Validación (validaciones.ts)', () => {
  describe('validarRun', () => {
    it('debe retornar error si el RUN está vacío', () => {
      expect(validarRun('')).toBe('El RUN es obligatorio.')
    })

    it('debe rechazar un RUN con formato inválido', () => {
      expect(validarRun('1234')).toContain('RUN inválido')
    })

    it('debe aceptar un RUN válido sin puntos ni guión', () => {
      expect(validarRun('190000000')).toBeNull()
    })
  })

  describe('validarCorreo', () => {
    it('debe requerir el correo si viene vacío', () => {
      expect(validarCorreo('')).toBe('El correo es obligatorio.')
    })

    it('debe rechazar correos con formato erróneo', () => {
      expect(validarCorreo('correo_invalido')).toBe('Ingresa un correo válido.')
    })

    it('debe aceptar un correo con estructura correcta', () => {
      expect(validarCorreo('contacto@lif.cl')).toBeNull()
    })
  })

  describe('validarClave y validarConfirmacion', () => {
    it('debe exigir longitud mínima de contraseña', () => {
      expect(validarClave('123')).toContain('Debe tener al menos')
      expect(validarClave('12345')).toBeNull()
    })

    it('debe validar coincidencia de contraseñas', () => {
      expect(validarConfirmacion('12345', '54321')).toBe('Las contraseñas no coinciden.')
      expect(validarConfirmacion('12345', '12345')).toBeNull()
    })
  })

  describe('validarRegistro', () => {
    it('debe generar reporte de errores para datos inválidos', () => {
      const datosInvalidos = {
        run: '123',
        correo: 'bad_email',
        nombre: '',
        apellidos: '',
        clave: '12',
        claveConfirma: '99'
      }

      const errores = validarRegistro(datosInvalidos)
      expect(errores.run).toBeTruthy()
      expect(errores.correo).toBeTruthy()
      expect(errores.nombre).toBeTruthy()
    })

    it('debe retornar objeto vacío cuando la información es válida', () => {
      const datosValidos = {
        run: '190000000',
        correo: 'juan@lif.cl',
        nombre: 'Juan',
        apellidos: 'Pérez',
        clave: '12345',
        claveConfirma: '12345'
      }

      const errores = validarRegistro(datosValidos)
      expect(Object.keys(errores)).toHaveSize(0)
    })
  })
})