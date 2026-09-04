// Carga dinámica de Regiones y Comunas
function poblarRegionesComunas() {
    const selectRegion = document.getElementById('reg-region');
    const selectComuna = document.getElementById('reg-comuna');

    if (!selectRegion || !selectComuna) return;

    selectRegion.innerHTML = '<option value="">-- Selecciona región --</option>';
    regionesData.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.region;
        opt.textContent = r.region;
        selectRegion.appendChild(opt);
    });

    selectRegion.addEventListener('change', function() {
        const regEncontrada = regionesData.find(r => r.region === this.value);
        selectComuna.innerHTML = '<option value="">-- Selecciona comuna --</option>';

        if (regEncontrada) {
            regEncontrada.comunas.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c;
                selectComuna.appendChild(opt);
            });
        }
    });
}

// Validaciones de formularios
function inicializarFormularioUsuario(idForm) {
    poblarRegionesComunas();
    const form = document.getElementById(idForm);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let esValido = true;

        const run = document.getElementById('reg-run');
        const nombre = document.getElementById('reg-nombre');
        const correo = document.getElementById('reg-correo');
        const clave = document.getElementById('reg-clave');
        const confirmaClave = document.getElementById('reg-clave-confirma');

        // Validar RUN
        if (run && run.value.trim().length < 8) {
            document.getElementById('reg-run-error').textContent = 'Ingresa un RUN válido (sin puntos ni guion).';
            esValido = false;
        } else if (run) {
            document.getElementById('reg-run-error').textContent = '';
        }

        // Validar Nombre
        if (nombre && nombre.value.trim() === '') {
            document.getElementById('reg-nombre-error').textContent = 'El nombre es obligatorio.';
            esValido = false;
        } else if (nombre) {
            document.getElementById('reg-nombre-error').textContent = '';
        }

        // Validar Correo
        if (correo && !correo.value.includes('@')) {
            document.getElementById('reg-correo-error').textContent = 'Ingresa un correo electrónico válido.';
            esValido = false;
        } else if (correo) {
            document.getElementById('reg-correo-error').textContent = '';
        }

        // Validar Contraseña
        if (clave && (clave.value.length < 4 || clave.value.length > 10)) {
            document.getElementById('reg-clave-error').textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
            esValido = false;
        } else if (clave) {
            document.getElementById('reg-clave-error').textContent = '';
        }

        if (confirmaClave && confirmaClave.value !== clave.value) {
            document.getElementById('reg-clave-confirma-error').textContent = 'Las contraseñas no coinciden.';
            esValido = false;
        } else if (confirmaClave) {
            document.getElementById('reg-clave-confirma-error').textContent = '';
        }

        if (esValido) {
            document.getElementById('form-registro-exito').classList.remove('d-none');
            form.reset();
        }
    });
}

function inicializarFormularioLogin() {
    const form = document.getElementById('form-login');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const correo = document.getElementById('login-correo');
        const clave = document.getElementById('login-clave');
        let valido = true;

        if (!correo.value.includes('@')) {
            document.getElementById('login-correo-error').textContent = 'Correo no válido.';
            valido = false;
        } else {
            document.getElementById('login-correo-error').textContent = '';
        }

        if (clave.value.length < 4) {
            document.getElementById('login-clave-error').textContent = 'Mínimo 4 caracteres.';
            valido = false;
        } else {
            document.getElementById('login-clave-error').textContent = '';
        }

        if (valido) {
            document.getElementById('login-exito').classList.remove('d-none');
            form.reset();
        }
    });
}

function inicializarFormularioContacto() {
    const form = document.getElementById('form-contacto');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('contacto-nombre');
        const comentario = document.getElementById('contacto-comentario');
        let valido = true;

        if (!nombre.value.trim()) {
            document.getElementById('contacto-nombre-error').textContent = 'El nombre es obligatorio.';
            valido = false;
        } else {
            document.getElementById('contacto-nombre-error').textContent = '';
        }

        if (!comentario.value.trim()) {
            document.getElementById('contacto-comentario-error').textContent = 'Escribe un comentario.';
            valido = false;
        } else {
            document.getElementById('contacto-comentario-error').textContent = '';
        }

        if (valido) {
            document.getElementById('contacto-exito').classList.remove('d-none');
            form.reset();
        }
    });
}