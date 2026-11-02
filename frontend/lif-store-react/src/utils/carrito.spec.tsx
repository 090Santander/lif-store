import type { Partido } from '../data/datosLIF';
import {
  CARGO_SERVICIO,
  PRECIO_POR_DEFECTO,
  calcularResumen,
  crearTicket,
  precioDe,
  type Ticket,
} from './carrito';

const partido = (extra: Record<string, unknown> = {}) =>
  ({
    equipoLocal: 'Deportivo Norte',
    equipoVisitante: 'Unión Sur',
    fecha: '2026-11-01',
    hora: '15:00',
    fase: 'Fase regular',
    precio: 8000,
    ...extra,
  }) as unknown as Partido;

const ticket = (precio: number, idUnico = 1): Ticket => ({
  idUnico,
  encuentro: 'A vs B',
  localidad: 'General',
  precio,
  fecha: '2026-11-01 15:00',
});

describe('precioDe', () => {
  it('usa el precio del partido cuando es numérico', () => {
    expect(precioDe(partido({ precio: 8000 }))).toBe(8000);
  });

  it('convierte un precio en texto a número', () => {
    expect(precioDe(partido({ precio: '7000' }))).toBe(7000);
  });

  it('usa el precio por defecto si falta, es 0 o no es numérico', () => {
    expect(precioDe(partido({ precio: undefined }))).toBe(PRECIO_POR_DEFECTO);
    expect(precioDe(partido({ precio: 0 }))).toBe(PRECIO_POR_DEFECTO);
    expect(precioDe(partido({ precio: 'gratis' }))).toBe(PRECIO_POR_DEFECTO);
  });
});

describe('crearTicket', () => {
  it('arma el ticket con los datos del partido', () => {
    const t = crearTicket(partido());

    expect(t.encuentro).toBe('Deportivo Norte vs Unión Sur');
    expect(t.localidad).toBe('Fase regular');
    expect(t.precio).toBe(8000);
    expect(t.fecha).toBe('2026-11-01 15:00');
    expect(typeof t.idUnico).toBe('number');
  });

  it('usa "General" como localidad si el partido no tiene fase', () => {
    expect(crearTicket(partido({ fase: undefined })).localidad).toBe('General');
  });

  it('deja solo la fecha cuando el partido no tiene hora', () => {
    expect(crearTicket(partido({ hora: undefined })).fecha).toBe('2026-11-01');
  });
});

describe('calcularResumen', () => {
  it('devuelve ceros con el carrito vacío', () => {
    expect(calcularResumen([])).toEqual({ subtotal: 0, cargo: 0, total: 0 });
  });

  it('suma el subtotal y aplica el cargo por servicio', () => {
    const r = calcularResumen([ticket(5000, 1), ticket(7500, 2)]);

    expect(r.subtotal).toBe(12500);
    expect(r.cargo).toBe(Math.round(12500 * CARGO_SERVICIO));
    expect(r.total).toBe(r.subtotal + r.cargo);
  });

  it('cuenta como 0 un ticket con precio inválido', () => {
    const r = calcularResumen([ticket(NaN, 1), ticket(5000, 2)]);

    expect(r.subtotal).toBe(5000);
  });
});