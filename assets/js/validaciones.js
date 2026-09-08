/**
 * validaciones.js - Lógica unificada para validación de formularios en LIF
 */

// --- HELPER DE BÚSQUEDA MULTI-ID ---
const getEl = (...ids) => ids.map(id => document.getElementById(id)).find(el => el !== null);

// --- AUXILIARES DE VALIDACIÓN ---

// Módulo 11 para validación de RUT/RUN chileno
const validarRut = (rut = '') => {
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

// Formato y dominios institucionales/permitidos
const validarCorreo = (correo = '') => {
  const doms = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  const c = correo.toLowerCase().trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) && doms.some(d => c.endsWith(d));
};

// Control visual de clases Bootstrap (is-valid / is-invalid) y mensajes de error
const validarCampo = (input, condicion, msgError = '', errId = '') => {
  if (!input) return true;
  const esValido = Boolean(condicion);
  input.classList.toggle('is-invalid', !esValido);
  input.classList.toggle('is-valid', esValido);
  
  const errEl = document.getElementById(errId);
  if (errEl) errEl.innerText = esValido ? '' : msgError;
  return esValido;
};

// Limpieza de estados de validación
const limpiarValidaciones = (form) => {
  if (!form) return;
  form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
    el.classList.remove('is-valid', 'is-invalid');
  });
};

// --- EVENTOS DE FORMULARIOS ---
document.addEventListener('DOMContentLoaded', () => {

  // 1. FORMULARIO DE REGISTRO
  const formReg = getEl('formRegistro', 'form-registro');
  formReg?.addEventListener('submit', (e) => {
    e.preventDefault();
    const run = getEl('reg-run', 'run');
    const correo = getEl('reg-correo', 'correo');
    const nom = getEl('reg-nombre', 'nombre');
    const ape = getEl('reg-apellidos', 'apellidos');
    const pass = getEl('reg-clave', 'clave');
    const pass2 = getEl('reg-clave-confirma', 'clave-confirma');

    const v1 = validarCampo(run, validarRut(run?.value), 'RUN inválido (ej: 12345678K)', 'reg-run-error');
    const v2 = validarCampo(correo, validarCorreo(correo?.value), 'Correo no permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com)', 'reg-correo-error');
    const v3 = validarCampo(nom, nom?.value.trim().length >= 2, 'Mínimo 2 caracteres', 'reg-nombre-error');
    const v4 = validarCampo(ape, ape?.value.trim().length >= 2, 'Mínimo 2 caracteres', 'reg-apellidos-error');
    const v5 = validarCampo(pass, pass?.value.length >= 6 && pass?.value.length <= 10, 'Entre 6 y 10 caracteres', 'reg-clave-error');
    const v6 = validarCampo(pass2, pass2?.value && pass2.value === pass?.value, 'Las contraseñas no coinciden', 'reg-clave-confirma-error');

    if (v1 && v2 && v3 && v4 && v5 && v6) {
      const exitoAlert = document.getElementById('form-registro-exito');
      if (exitoAlert) exitoAlert.classList.remove('d-none');
      
      alert('🎉 Registro completado exitosamente. Redirigiendo a inicio de sesión...');
      formReg.reset();
      limpiarValidaciones(formReg);
      setTimeout(() => window.location.href = 'login.html', 1000);
    }
  });

  // 2. FORMULARIO DE LOGIN
  const formLogin = getEl('formLogin', 'form-login');
  formLogin?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = getEl('inputEmail', 'email', 'login-email');
    const pass = getEl('inputPassword', 'password', 'login-password');

    const v1 = validarCampo(email, validarCorreo(email?.value), 'Ingresa un correo institucional o @gmail.com', 'login-email-error');
    const v2 = validarCampo(pass, pass?.value.length >= 4 && pass?.value.length <= 10, 'Contraseña de 4 a 10 caracteres', 'login-password-error');

    if (v1 && v2) {
      alert(`👋 ¡Bienvenido de nuevo! Sesión iniciada como: ${email.value}`);
      window.location.href = 'index.html';
    }
  });

  // 3. FORMULARIO DE CONTACTO
  const formContacto = getEl('formContacto', 'form-contacto');
  formContacto?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = getEl('nombreContacto', 'contacto-nombre', 'nombre');
    const email = getEl('emailContacto', 'contacto-email', 'email');
    const msg = getEl('mensajeContacto', 'contacto-mensaje', 'mensaje');

    const v1 = validarCampo(nom, nom?.value.trim().length >= 3, 'Ingresa al menos 3 caracteres', 'contacto-nombre-error');
    const v2 = validarCampo(email, validarCorreo(email?.value), 'Ingresa un correo permitido', 'contacto-email-error');
    const v3 = validarCampo(msg, msg?.value.trim().length >= 10, 'El mensaje debe tener al menos 10 caracteres', 'contacto-mensaje-error');

    if (v1 && v2 && v3) {
      alert('✉️ ¡Gracias por contactarnos! Tu mensaje ha sido recibido.');
      formContacto.reset();
      limpiarValidaciones(formContacto);
    }
  });

  // 4. FORMULARIO DE SOLICITUD (RF-03)
  const formSol = getEl('formSolicitud', 'form-solicitud');
  formSol?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('📝 Solicitud enviada correctamente. Evaluaremos tu requerimiento en menos de 24 horas.');
    formSol.reset();
    limpiarValidaciones(formSol);
  });

});