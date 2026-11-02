const inicializarFormularioLogin = () => {
    const formLogin = document.getElementById('formLogin');
    if (!formLogin) return;

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('inputEmail');
        const pass = document.getElementById('inputPassword');

        // Lógica de validación básica
        if (email.value.trim() !== '' && pass.value.length >= 4) {
            const correoIngresado = email.value.toLowerCase().trim();
            const claveIngresada = pass.value;

            // Definir administrador (ajusta las credenciales a las que uses)
            const esAdmin = correoIngresado === "admin@lifchile.cl" && claveIngresada === "admin123";

            const usuarioSesion = {
                nombre: correoIngresado.split('@')[0],
                correo: correoIngresado,
                rol: esAdmin ? "admin" : "usuario"
            };

            // Guardar en sesión
            if (typeof DatosLIF !== 'undefined') {
                DatosLIF.setUsuario(usuarioSesion);
            }

            if (esAdmin) {
                alert("🛡️ ¡Bienvenido, Administrador!");
                window.location.href = "admin.html";
            } else {
                alert(`👋 ¡Bienvenido de nuevo!`);
                window.location.href = "perfil.html";
            }
        } else {
            alert('Por favor, ingresa credenciales válidas.');
        }
    });
};

// Asegúrate de llamar a esta función cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    inicializarFormularioLogin();
    // (Aquí puedes inicializar también tus otros formularios de validación)
});