/**
 * validaciones.js - Versión simplificada y limpia
 */

// 1. Funciones auxiliares de validación
const validarRut = (rut) => {
  const v = rut.replace(/[^0-9kK]/g, '');
  if (v.length < 8) return false;
  const cuerpo = v.slice(0, -1), dv = v.slice(-1).toUpperCase();
  let suma = 0, mul = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const calc = 11 - (suma % 11);
  return dv === (calc === 11 ? '0' : calc === 10 ? 'K' : calc.toString());
};

const validarCorreo = (correo) => {
  const doms = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  const c = correo.toLowerCase().trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) && doms.some(d => c.endsWith(d));
};

// 2. Helper UI: maneja clases is-invalid y mensajes de error en una sola línea
const validarCampo = (input, condicion, msgError = '', errId = '') => {
  if (!input) return true;
  const esValido = Boolean(condicion);
  input.classList.toggle('is-invalid', !esValido);
  const errEl = document.getElementById(errId);
  if (errEl) errEl.innerText = esValido ? '' : msgError;
  return esValido;
};

// 3. Inicialización centralizada de formularios
document.addEventListener('DOMContentLoaded', () => {

  // Formulario de Registro
  const formReg = document.getElementById('formRegistro') || document.getElementById('form-registro');
  formReg?.addEventListener('submit', (e) => {
    e.preventDefault();
    const run = document.getElementById('reg-run');
    const correo = document.getElementById('reg-correo');
    const nom = document.getElementById('reg-nombre');
    const ape = document.getElementById('reg-apellidos');
    const pass = document.getElementById('reg-clave');
    const pass2 = document.getElementById('reg-clave-confirma');

    const v1 = validarCampo(run, validarRut(run?.value || ''), 'RUN inválido (ej: 12345678K)', 'reg-run-error');
    const v2 = validarCampo(correo, validarCorreo(correo?.value || ''), 'Correo no permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com)', 'reg-correo-error');
    const v3 = validarCampo(nom, nom?.value.trim().length >= 2, 'Mínimo 2 caracteres', 'reg-nombre-error');
    const v4 = validarCampo(ape, ape?.value.trim().length >= 2, 'Mínimo 2 caracteres', 'reg-apellidos-error');
    const v5 = validarCampo(pass, pass?.value.length >= 6 && pass?.value.length <= 10, 'Entre 6 y 10 caracteres', 'reg-clave-error');
    const v6 = validarCampo(pass2, pass2?.value && pass2.value === pass?.value, 'Las contraseñas no coinciden', 'reg-clave-confirma-error');

    if (v1 && v2 && v3 && v4 && v5 && v6) {
      formReg.reset();
      document.getElementById('form-registro-exito')?.classList.remove('d-none');
      alert('¡Registro completado con éxito!');
    }
  });

  // Formulario de Login
  const formLogin = document.getElementById('formLogin') || document.getElementById('form-login');
  formLogin?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email') || document.getElementById('login-email');
    const pass = document.getElementById('password') || document.getElementById('login-password');

    const v1 = validarCampo(email, validarCorreo(email?.value || ''));
    const v2 = validarCampo(pass, pass?.value.length >= 4 && pass?.value.length <= 10);

    if (v1 && v2) {
      alert('¡Inicio de sesión exitoso!');
      window.location.href = 'index.html';
    }
  });

  // Formulario de Contacto
  const formContacto = document.getElementById('formContacto') || document.getElementById('form-contacto');
  formContacto?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = document.getElementById('nombreContacto') || document.getElementById('contacto-nombre') || document.getElementById('nombre');
    const email = document.getElementById('emailContacto') || document.getElementById('contacto-email') || document.getElementById('email');
    const msg = document.getElementById('mensajeContacto') || document.getElementById('contacto-mensaje') || document.getElementById('mensaje');

    const v1 = validarCampo(nom, nom?.value.trim().length >= 3, 'Ingresa al menos 3 caracteres', 'contacto-nombre-error');
    const v2 = validarCampo(email, validarCorreo(email?.value || ''), 'Ingresa un correo permitido', 'contacto-email-error');
    const v3 = validarCampo(msg, msg?.value.trim().length >= 10, 'El mensaje debe tener al menos 10 caracteres', 'contacto-mensaje-error');

    if (v1 && v2 && v3) {
      alert('¡Gracias por contactarnos!');
      formContacto.reset();
    }
  });
});