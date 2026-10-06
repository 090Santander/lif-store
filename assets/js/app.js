/**
 * ============================================================================
 * app.js - Script Principal de LIF (Liga Independiente de Fútbol)
 * Control de Modo Oscuro, Protección de Rutas, Roles y Navegación
 * ============================================================================
 */

const CLAVE_TEMA = "lif-theme";
const KEY_USUARIO = "LIF_USUARIO_ACTIVO";

// ==========================================
// 1. MODO OSCURO (ESTADO Y UI)
// ==========================================

const obtenerBotonTema = () => 
    document.getElementById("btn-dark-mode") || document.getElementById("btnModo");

const aplicarModoOscuro = (activar) => {
    const btnDarkMode = obtenerBotonTema();
    
    document.body.classList.toggle("dark-mode", activar);
    document.documentElement.setAttribute("data-bs-theme", activar ? "dark" : "light");

    if (btnDarkMode) {
        btnDarkMode.textContent = activar ? "☀️" : "🌙";
        btnDarkMode.setAttribute("aria-pressed", activar ? "true" : "false");
    }

    localStorage.setItem(CLAVE_TEMA, activar ? "dark" : "light");
};

const inicializarTema = () => {
    const temaGuardado = localStorage.getItem(CLAVE_TEMA);
    if (temaGuardado === "dark") {
        aplicarModoOscuro(true);
    }

    const btnDarkMode = obtenerBotonTema();
    btnDarkMode?.addEventListener("click", () => {
        const esOscuro = document.body.classList.contains("dark-mode");
        aplicarModoOscuro(!esOscuro);
    });
};

// ==========================================
// 2. CONTROL DE ACCESOS Y ROLES (RBAC)
// ==========================================

const obtenerUsuarioActivo = () => {
    try {
        return JSON.parse(localStorage.getItem(KEY_USUARIO)) || null;
    } catch {
        return null;
    }
};

const esAdmin = () => {
    const usuario = obtenerUsuarioActivo();
    return usuario?.rol === "admin";
};

const gestionarAccesosYRutas = () => {
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";
    const paginasAdmin = ["admin.html", "solicitud.html"];
    const esUsuarioAdmin = esAdmin();

    // 1. Ocultar o Mostrar items del menú según rol
    document.querySelectorAll(".navbar-nav .nav-link").forEach(enlace => {
        const href = enlace.getAttribute("href");
        if (paginasAdmin.includes(href)) {
            const navItem = enlace.closest(".nav-item") || enlace;
            navItem.style.display = esUsuarioAdmin ? "block" : "none";
        }
    });

    // 2. Proteger la navegación por URL
    if (paginasAdmin.includes(paginaActual) && !esUsuarioAdmin) {
        alert("⚠️ Acceso restringido. Inicia sesión como administrador para acceder a esta vista.");
        window.location.href = "login.html";
        return;
    }

    // 3. Ajustar botones del header si hay sesión activa
    const usuario = obtenerUsuarioActivo();
    if (usuario) {
        const contenedorBotones = document.querySelector(".navbar .d-flex.align-items-center");
        const btnLogin = contenedorBotones?.querySelector('a[href="login.html"]');
        const btnReg = contenedorBotones?.querySelector('a[href="registro.html"]');

        if (btnLogin) btnLogin.style.display = "none";
        if (btnReg) btnReg.style.display = "none";

        if (contenedorBotones && !document.getElementById("btn-logout")) {
            const btnLogout = document.createElement("button");
            btnLogout.id = "btn-logout";
            btnLogout.className = "btn btn-sm btn-outline-danger rounded-pill px-3 ms-1";
            btnLogout.textContent = `Salir (${usuario.rol === 'admin' ? 'Admin' : 'User'})`;
            
            btnLogout.addEventListener("click", () => {
                localStorage.removeItem(KEY_USUARIO);
                alert("Sesión cerrada correctamente.");
                window.location.href = "login.html";
            });

            contenedorBotones.insertBefore(btnLogout, contenedorBotones.firstChild);
        }
    }
};

// ==========================================
// 3. NAVEGACIÓN ACTIVA
// ==========================================

const resaltarEnlaceNavegacion = () => {
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";
    const enlacesNav = document.querySelectorAll(".navbar-nav .nav-link");

    enlacesNav.forEach(enlace => {
        const href = enlace.getAttribute("href");
        const esPaginaActual = href === paginaActual;

        enlace.classList.toggle("active", esPaginaActual);
        
        if (esPaginaActual) {
            enlace.setAttribute("aria-current", "page");
        } else if (href && href !== "#") {
            enlace.removeAttribute("aria-current");
        }
    });
};

// ==========================================
// 4. COMPONENTES BOOTSTRAP (TOOLTIPS)
// ==========================================

const inicializarTooltips = () => {
    if (typeof bootstrap !== "undefined" && bootstrap?.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
            .forEach(el => new bootstrap.Tooltip(el));
    }
};

// ==========================================
// 5. INICIALIZACIÓN GENERAL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    inicializarTema();
    gestionarAccesosYRutas();
    resaltarEnlaceNavegacion();
    inicializarTooltips();
});