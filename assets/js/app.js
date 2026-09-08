/**
 * app.js - Script Principal de LIF (Liga Independiente de Fútbol)
 * Control de Modo Oscuro, Navegación Activa y Funciones Generales
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. CONTROL DE MODO OSCURO ---
    const btnDarkMode = document.getElementById("btn-dark-mode") || document.getElementById("btnModo");

    // Cargar preferencia guardada
    const temaGuardado = localStorage.getItem("lif-theme");
    if (temaGuardado === "dark") {
        aplicarModoOscuro(true);
    }

    // Evento al presionar el botón
    btnDarkMode?.addEventListener("click", () => {
        const esOscuro = document.body.classList.contains("dark-mode");
        aplicarModoOscuro(!esOscuro);
    });

    // Función global para aplicar cambios visuales
    function aplicarModoOscuro(activar) {
        document.body.classList.toggle("dark-mode", activar);
        
        // Atributo nativo de Bootstrap 5
        document.documentElement.setAttribute("data-bs-theme", activar ? "dark" : "light");

        // Actualizar texto / ícono del botón
        if (btnDarkMode) {
            btnDarkMode.textContent = activar ? "☀️" : "🌙";
            btnDarkMode.setAttribute("aria-pressed", activar ? "true" : "false");
        }

        // Persistir en LocalStorage
        localStorage.setItem("lif-theme", activar ? "dark" : "light");
    }

    // --- 2. DESTACAR PÁGINA ACTUAL EN EL MENÚ DE NAVEGACIÓN ---
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";
    const enlacesNav = document.querySelectorAll(".navbar-nav .nav-link");

    enlacesNav.forEach(enlace => {
        const href = enlace.getAttribute("href");
        if (href === paginaActual) {
            enlace.classList.add("active");
            enlace.setAttribute("aria-current", "page");
        } else if (href && href !== "#") {
            enlace.classList.remove("active");
            enlace.removeAttribute("aria-current");
        }
    });

    // --- 3. INICIALIZACIÓN DE TOOLTIPS BOOTSTRAP (OPCIONAL) ---
    if (typeof bootstrap !== "undefined" && bootstrap.Tooltip) {
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipElements.forEach(el => new bootstrap.Tooltip(el));
    }
});