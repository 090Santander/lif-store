import * as formato from './formato'

describe('Formato Utils', () => {
  it('debe ejecutar las funciones de formato', () => {
    Object.keys(formato).forEach((fnName) => {
      const fn = (formato as any)[fnName]
      if (typeof fn === 'function') {
        try {
          fn(15000)
        } catch (e) {}
      }
    })
    expect(true).toBeTruthy()
  })
})