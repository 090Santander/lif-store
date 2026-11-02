
/**
 * =======================================================================
 * entradas.js - Inicializador de la vista de Entradas / e-Tickets
 * =======================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ejecuta la función de renderizado que está en app.js
    if (typeof renderizarPartidos === 'function') {
        renderizarPartidos();
    }

    // 2. Actualiza el número del carrito en la barra superior
    if (typeof actualizarBadge === 'function') {
        actualizarBadge();
    }
});