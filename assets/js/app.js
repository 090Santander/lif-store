document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MODO OSCURO (DARK MODE)
    // ==========================================
    const btnDarkMode = document.getElementById('btn-dark-mode');
    const body = document.body;

    // Verificar si el usuario ya tenía el modo oscuro guardado de antes
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if(btnDarkMode) btnDarkMode.textContent = '☀️'; // Cambiamos el icono al sol
    }

    // Escuchar el clic en el botón
    if (btnDarkMode) {
        btnDarkMode.addEventListener('click', () => {
            // Alternamos la clase en el body
            body.classList.toggle('dark-mode');

            // Revisamos si quedó activado o desactivado para guardarlo y cambiar el icono
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled'); // Guardamos en memoria
                btnDarkMode.textContent = '☀️'; // Ponemos el sol
            } else {
                localStorage.setItem('darkMode', 'disabled'); // Borramos de memoria
                btnDarkMode.textContent = '🌙'; // Volvemos a la luna
            }
        });
    }

    // ==========================================
    // 2. CONTADOR Y GESTIÓN DE MIS ENTRADAS / CARRITO
    // ==========================================
    const actualizarContadorCarrito = () => {
        const badges = document.querySelectorAll('.badge-carrito');
        const carrito = JSON.parse(localStorage.getItem('carritoLIF')) || [];
        const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

        badges.forEach(badge => {
            badge.textContent = totalItems;
        });
    };

    actualizarContadorCarrito();

    // ==========================================
    // 3. INTERCEPTOR Y MANEJO DE FORMULARIOS
    // ==========================================
    
    // Formulario de Solicitudes (RF-03)
    const formSolicitud = document.getElementById('formSolicitud');
    if (formSolicitud) {
        formSolicitud.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✅ Solicitud enviada exitosamente. El comité administrativo de la LIF revisará su propuesta dentro de 24 horas hábiles.');
            formSolicitud.reset();
        });
    }

    // Formulario de Actas de Partidos (RF-05)
    const formActa = document.getElementById('formActa');
    if (formActa) {
        formActa.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('📋 Acta oficial guardada y firmada. Los resultados y estadísticas han sido publicados en las tablas de posiciones.');
            formActa.reset();
        });
    }

    // Formulario de Inicio de Sesión (RF-01)
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            alert(`👋 ¡Bienvenido de nuevo! Sesión iniciada correctamente como: ${email}`);
            window.location.href = 'index.html';
        });
    }

    // Formulario de Registro de Usuarios (RF-01)
    const formRegistro = document.getElementById('formRegistro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('🎉 Registro completado exitosamente. Ahora puedes iniciar sesión con tus credenciales.');
            window.location.href = 'login.html';
        });
    }

});