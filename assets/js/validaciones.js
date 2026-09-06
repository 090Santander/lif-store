/**
 * validaciones.js - Lógica de validación de entradas y formularios
 */

// Validación del RUN chileno con dígito verificador (Módulo 11)
function validarRut(rut) {
    let valor = rut.replace(/[^0-9kK]/g, '');
    if (valor.length < 8) return false;

    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    let dvEsperado = 11 - (suma % 11);
    let dvCalc = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvCalc;
}

// Validación de email mediante Expresión Regular
function validarCorreo(correo) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(correo).toLowerCase());
}

// Inicialización de validación en Formulario de Registro
function inicializarFormularioUsuario(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let esValido = true;

        // Limpiar errores
        document.querySelectorAll(".text-danger").forEach(el => el.innerText = "");

        // Validar RUN
        const runInput = document.getElementById("reg-run");
        if (runInput) {
            if (!runInput.value.trim() || !validarRut(runInput.value.trim())) {
                document.getElementById("reg-run-error").innerText = "RUN inválido. Formato: 12345678K";
                esValido = false;
            }
        }

        // Validar Correo
        const correoInput = document.getElementById("reg-correo");
        if (correoInput) {
            if (!validarCorreo(correoInput.value.trim())) {
                document.getElementById("reg-correo-error").innerText = "Ingresa un correo electrónico válido.";
                esValido = false;
            }
        }

        // Validar Nombre y Apellidos
        ["reg-nombre", "reg-apellidos"].forEach(id => {
            const input = document.getElementById(id);
            if (input && input.value.trim().length < 2) {
                const errDiv = document.getElementById(`${id}-error`);
                if (errDiv) errDiv.innerText = "Este campo es obligatorio.";
                esValido = false;
            }
        });

        // Validar Contraseñas
        const claveInput = document.getElementById("reg-clave");
        const confirmaInput = document.getElementById("reg-clave-confirma");

        if (claveInput && claveInput.value.length < 6) {
            document.getElementById("reg-clave-error").innerText = "La contraseña debe tener al menos 6 caracteres.";
            esValido = false;
        }

        if (confirmaInput && claveInput && claveInput.value !== confirmaInput.value) {
            document.getElementById("reg-clave-confirma-error").innerText = "Las contraseñas no coinciden.";
            esValido = false;
        }

        // Si la validación es exitosa
        if (esValido) {
            form.reset();
            const exitoAlert = document.getElementById("form-registro-exito");
            if (exitoAlert) exitoAlert.classList.remove("d-none");
        }
    });
}

// Inicialización Formulario Login
function inicializarFormularioLogin() {
    const formLogin = document.getElementById("formLogin");
    if (!formLogin) return;

    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        let esValido = true;

        if (!email || !validarCorreo(email.value)) {
            if (email) email.classList.add("is-invalid");
            esValido = false;
        } else {
            if (email) email.classList.remove("is-invalid");
        }

        if (!password || password.value.trim().length < 4) {
            if (password) password.classList.add("is-invalid");
            esValido = false;
        } else {
            if (password) password.classList.remove("is-invalid");
        }

        if (esValido) {
            alert("¡Inicio de sesión exitoso!");
            window.location.href = "index.html";
        }
    });
}