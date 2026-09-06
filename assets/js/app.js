/**
 * app.js - Script principal de inicialización para LIF
 */

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Inicializar Badge del Carrito
    if (typeof actualizarBadgeCarrito === "function") {
        actualizarBadgeCarrito();
    }

    // 2. Configuración y Persistencia del Modo Oscuro
    const btnModo = document.getElementById("btnModo");
    const MODO_KEY = "LIF_MODO_OSCURO";

    function aplicarModo(esOscuro) {
        if (esOscuro) {
            document.body.classList.add("bg-dark", "text-white");
            if (btnModo) btnModo.textContent = "☀️ Modo Claro";
        } else {
            document.body.classList.remove("bg-dark", "text-white");
            if (btnModo) btnModo.textContent = "🌙 Modo Oscuro";
        }
    }

    // Cargar preferencia guardada
    const esOscuroGuardado = localStorage.getItem(MODO_KEY) === "true";
    aplicarModo(esOscuroGuardado);

    if (btnModo) {
        btnModo.addEventListener("click", function () {
            const nuevoEstado = !document.body.classList.contains("bg-dark");
            localStorage.setItem(MODO_KEY, nuevoEstado);
            aplicarModo(nuevoEstado);
        });
    }

    // 3. Inicializar validaciones si existen los formularios
    if (typeof inicializarFormularioLogin === "function") {
        inicializarFormularioLogin();
    }

    // 4. Renderizar Carrito si estamos en carrito.html
    if (typeof renderizarCarrito === "function") {
        renderizarCarrito();
    }
});