import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import type { Usuario } from '../data/datosLIF';

const usuarioConRol = (rol: string) => ({ rol }) as unknown as Usuario;

function Consumidor() {
  const { usuario, esAdmin, iniciarSesion, cerrarSesion } = useAuth();
  return (
    <div>
      <span data-testid="rol">{usuario ? String(usuario.rol) : 'sin-sesion'}</span>
      <span data-testid="admin">{esAdmin ? 'si' : 'no'}</span>
      <button onClick={() => iniciarSesion(usuarioConRol('admin'))}>entrar-admin</button>
      <button onClick={() => iniciarSesion(usuarioConRol('hincha'))}>entrar-hincha</button>
      <button onClick={cerrarSesion}>salir</button>
    </div>
  );
}

const renderConProvider = () =>
  render(
    <AuthProvider>
      <Consumidor />
    </AuthProvider>
  );

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('empieza sin sesión y sin permisos de administrador', () => {
    renderConProvider();

    expect(screen.getByTestId('rol').textContent).toBe('sin-sesion');
    expect(screen.getByTestId('admin').textContent).toBe('no');
  });

  it('iniciarSesion con rol admin habilita esAdmin', () => {
    renderConProvider();
    fireEvent.click(screen.getByText('entrar-admin'));

    expect(screen.getByTestId('rol').textContent).toBe('admin');
    expect(screen.getByTestId('admin').textContent).toBe('si');
  });

  it('iniciarSesion con otro rol no da permisos de administrador', () => {
    renderConProvider();
    fireEvent.click(screen.getByText('entrar-hincha'));

    expect(screen.getByTestId('rol').textContent).toBe('hincha');
    expect(screen.getByTestId('admin').textContent).toBe('no');
  });

  it('cerrarSesion elimina al usuario', () => {
    renderConProvider();
    fireEvent.click(screen.getByText('entrar-admin'));
    fireEvent.click(screen.getByText('salir'));

    expect(screen.getByTestId('rol').textContent).toBe('sin-sesion');
    expect(screen.getByTestId('admin').textContent).toBe('no');
  });

  it('recupera la sesión guardada al volver a montar el provider', () => {
    const primera = renderConProvider();
    fireEvent.click(screen.getByText('entrar-admin'));
    primera.unmount();

    renderConProvider();

    expect(screen.getByTestId('rol').textContent).toBe('admin');
  });

  it('useAuth fuera de AuthProvider lanza un error claro', () => {
    spyOn(console, 'error'); // React registra el error; lo silenciamos
    expect(() => render(<Consumidor />)).toThrowError(/AuthProvider/);
  });
});