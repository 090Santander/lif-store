/**
 * ============================================================================
 * validaciones.js - Lógica Unificada para Validación de Formularios (LIF)
 * ============================================================================
 */

// Credenciales por defecto para el rol de Administrador
const ADMIN_CREDENTIALS = {
  correo: "admin@lifchile.cl",
  clave: "admin123"
};

// ==========================================
// 1. HELPERS DE BÚSQUEDA Y DOM
// ==========================================

/**
 * Busca un elemento en el DOM por múltiples IDs posibles.
 * @param  {...string} ids Lista de IDs a buscar.
 * @returns {HTMLElement|null} El primer elemento encontrado.
 */
const getEl = (...ids) => ids.map(id => document.getElementById(id)).find(Boolean) || null;

// ==========================================
// 2. REGLAS DE VALIDACIÓN (FUNCIONES PURAS)
// ==========================================

/**
 * Valida un RUT/RUN chileno aplicando el algoritmo Módulo 11.
 * @param {string} rut
 * @returns {boolean}
 */
const validarRut = (rut = '') => {
  const v = rut.replace(/[^0-9kK]/g, '');
  if (v.length < 8) return false;

  const cuerpo = v.slice(0, -1);
  const dv = v.slice(-1).toUpperCase();

  let suma = 0;
  let mul = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }

  const calc = 11 - (suma % 11);
  const dvEsperado = calc === 11 ? '0' : calc === 10 ? 'K' : calc.toString();

  return dv === dvEsperado;
};

/**
 * Valida formato de correo y pertenencia a dominios permitidos.
 * @param {string} correo
 * @returns {boolean}
 */
const validarCorreo = (correo = '') => {
  const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com', '@lifchile.cl'];
  const c = correo.toLowerCase().trim();
  const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
  return formatoValido && dominiosPermitidos.some(dominio => c.endsWith(dominio));
};

// ==========================================
// 3. CONTROL VISUAL DE ESTADOS BOOTSTRAP
// ==========================================

/**
 * Aplica/remueve clases is-valid e is-invalid de Bootstrap y actualiza el texto de error.
 * @param {HTMLElement} input - Campo a validar.
 * @param {boolean} condicion - Evaluación de la regla de negocio.
 * @param {string} msgError - Mensaje a desplegar si es inválido.
 * @param {string} errId - ID del contenedor donde se muestra el mensaje.
 * @returns {boolean}
 */
const validarCampo = (input, condicion, msgError = '', errId = '') => {
  if (!input) return true;

  const esValido = Boolean(condicion);
  input.classList.toggle('is-invalid', !esValido);
  input.classList.toggle('is-valid', esValido);

  const errEl = document.getElementById(errId);
  if (errEl) {
    errEl.textContent = esValido ? '' : msgError;
  }

  return esValido;
};

/**
 * Elimina las clases de validación de todos los campos de un formulario.
 * @param {HTMLFormElement} form
 */
const limpiarValidaciones = (form) => {
  if (!form) return;
  form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
    el.classList.remove('is-valid', 'is-invalid');
  });
};

// ==========================================
// 4. CONTROLADORES DE EVENTOS POR FORMULARIO
// ==========================================

const inicializarFormularioRegistro = () => {
  const formReg = getEl('formRegistro', 'form-registro');
  if (!formReg) return;

  formReg.addEventListener('submit', (e) => {
    e.preventDefault();

    const run = getEl('reg-run', 'run');
    const correo = getEl('reg-correo', 'correo');
    const nom = getEl('reg-nombre', 'nombre');
    const ape = getEl('reg-apellidos', 'apellidos');
    const pass = getEl('reg-clave', 'clave');
    const pass2 = getEl('reg-clave-confirma', 'clave-confirma');

    const v1 = validarCampo(run, validarRut(run?.value), 'RUN inválido (ej: 12345678K)', 'reg-run-error');
    const v2 = validarCampo(correo, validarCorreo(correo?.value), 'Correo no permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com)', 'reg-correo-error');
    const v3 = validarCampo(nom, Boolean(nom?.value.trim().length >= 2), 'Mínimo 2 caracteres', 'reg-nombre-error');
    const v4 = validarCampo(ape, Boolean(ape?.value.trim().length >= 2), 'Mínimo 2 caracteres', 'reg-apellidos-error');
    const v5 = validarCampo(pass, Boolean(pass?.value.length >= 6 && pass?.value.length <= 10), 'Entre 6 y 10 caracteres', 'reg-clave-error');
    const v6 = validarCampo(pass2, Boolean(pass2?.value && pass2.value === pass?.value), 'Las contraseñas no coinciden', 'reg-clave-confirma-error');

    if (v1 && v2 && v3 && v4 && v5 && v6) {
      const exitoAlert = document.getElementById('form-registro-exito');
      if (exitoAlert) exitoAlert.classList.remove('d-none');

      alert('🎉 Registro completado exitosamente. Redirigiendo a inicio de sesión...');
      formReg.reset();
      limpiarValidaciones(formReg);
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    }
  });
};

const inicializarFormularioLogin = () => {
  const formLogin = getEl('formLogin', 'form-login');
  if (!formLogin) return;

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = getEl('inputEmail', 'email', 'login-email');
    const pass = getEl('inputPassword', 'password', 'login-password');

    const v1 = validarCampo(email, validarCorreo(email?.value), 'Ingresa un correo permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com, @lifchile.cl)', 'login-email-error');
    const v2 = validarCampo(pass, Boolean(pass?.value.length >= 4 && pass?.value.length <= 10), 'Contraseña de 4 a 10 caracteres', 'login-password-error');

    if (v1 && v2) {
      const correoIngresado = email.value.toLowerCase().trim();
      const claveIngresada = pass.value;

      // Verificar si las credenciales corresponden al Administrador
      const esAdmin = correoIngresado === ADMIN_CREDENTIALS.correo && claveIngresada === ADMIN_CREDENTIALS.clave;

      const usuarioSesion = {
        correo: correoIngresado,
        rol: esAdmin ? "admin" : "usuario"
      };

      // Guardar sesión activa en localStorage
      localStorage.setItem("LIF_USUARIO_ACTIVO", JSON.stringify(usuarioSesion));

      if (esAdmin) {
        alert("🛡️ ¡Bienvenido, Administrador! Se han habilitado las vistas de gestión.");
        window.location.href = "admin.html";
      } else {
        alert(`👋 ¡Bienvenido de nuevo! Sesión iniciada como: ${correoIngresado}`);
        window.location.href = "index.html";
      }
    }
  });
};

const inicializarFormularioContacto = () => {
  const formContacto = getEl('formContacto', 'form-contacto');
  if (!formContacto) return;

  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    const nom = getEl('nombreContacto', 'contacto-nombre', 'nombre');
    const email = getEl('emailContacto', 'contacto-email', 'email');
    const msg = getEl('mensajeContacto', 'contacto-mensaje', 'mensaje');

    const v1 = validarCampo(nom, Boolean(nom?.value.trim().length >= 3), 'Ingresa al menos 3 caracteres', 'contacto-nombre-error');
    const v2 = validarCampo(email, validarCorreo(email?.value), 'Ingresa un correo permitido', 'contacto-email-error');
    const v3 = validarCampo(msg, Boolean(msg?.value.trim().length >= 10), 'El mensaje debe tener al menos 10 caracteres', 'contacto-mensaje-error');

    if (v1 && v2 && v3) {
      alert('✉️ ¡Gracias por contactarnos! Tu mensaje ha sido recibido.');
      formContacto.reset();
      limpiarValidaciones(formContacto);
    }
  });
};

const inicializarFormularioSolicitud = () => {
  const formSol = getEl('formSolicitud', 'form-solicitud');
  if (!formSol) return;

  formSol.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('📝 Solicitud enviada correctamente. Evaluaremos tu requerimiento en menos de 24 horas.');
    formSol.reset();
    limpiarValidaciones(formSol);
  });
};

// ==========================================
// 5. INICIALIZACIÓN AUTOMÁTICA
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  inicializarFormularioRegistro();
  inicializarFormularioLogin();
  inicializarFormularioContacto();
  inicializarFormularioSolicitud();
});