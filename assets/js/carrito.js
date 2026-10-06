/**
 * assets/js/carrito.js
 * Gestión funcional del carrito de e-Tickets para LIF
 */

const KEY_CARRITO = "LIF_CARRITO_ENTRADAS";

// ==========================================
// 1. FUNCIONES PURAS Y ESTADO (LECTURA / ESCRITURA)
// ==========================================

// Lee el estado actual sin modificar nada
const obtenerCarrito = () => JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];

// Guarda el nuevo estado y actualiza la vista
const guardarCarrito = (nuevoCarrito) => {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(nuevoCarrito));
    actualizarBadge();
    renderizarCarrito();
};

// Calcula el total sumando el precio de cada entrada (Función pura)
const calcularTotal = (carrito) => carrito.reduce((acumulado, item) => acumulado + item.precio, 0);

// ==========================================
// 2. ACCIONES DEL CARRITO
// ==========================================

function agregarAlCarrito(idPartido, tipoLocalidad = "Galería General", precio = 3000) {
    const partidos = (typeof DATOS_LIF !== "undefined" && DATOS_LIF.partidos) ? DATOS_LIF.partidos : [];
    const partido = partidos.find(p => p.id === Number(idPartido)) || {
        local: "Partido LIF",
        visita: "Fecha Oficial",
        fecha: "Próxima Fecha"
    };

    const nuevoTicket = {
        idUnico: Date.now() + Math.floor(Math.random() * 1000),
        encuentro: `${partido.local} vs. ${partido.visita}`,
        localidad: tipoLocalidad,
        precio: Number(precio),
        fecha: partido.fecha
    };

    // Crear un nuevo arreglo sin mutar el original (Inmutabilidad)
    guardarCarrito([...obtenerCarrito(), nuevoTicket]);
    alert(`🎟️ Entrada agregada: ${nuevoTicket.encuentro} (${nuevoTicket.localidad})`);
}

function eliminarDelCarrito(idUnico) {
    // Filtrar excluyendo el elemento seleccionado
    const carritoFiltrado = obtenerCarrito().filter(item => item.idUnico !== idUnico);
    guardarCarrito(carritoFiltrado);
}

function vaciarCarrito() {
    if (confirm("¿Deseas vaciar todas las entradas del carrito?")) {
        localStorage.removeItem(KEY_CARRITO);
        actualizarBadge();
        renderizarCarrito();
    }
}

function finalizarCompra() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return alert("Tu carrito está vacío.");

    alert("🎉 ¡Compra realizada con éxito! Tus e-Tickets han sido generados.");
    localStorage.removeItem(KEY_CARRITO);
    actualizarBadge();
    renderizarCarrito();
}

// ==========================================
// 3. RENDERIZADO Y DOM
// ==========================================

function actualizarBadge() {
    const totalItems = obtenerCarrito().length;
    document.querySelectorAll(".badge-carrito").forEach(badge => {
        badge.textContent = totalItems;
    });
}

function renderizarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalElem = document.getElementById("total-carrito");
    
    if (!contenedor) return; // Si no estamos en la página del carrito, no hace nada

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-4 text-muted">
                    No tienes entradas agregadas a tu carrito.
                </td>
            </tr>`;
        if (totalElem) totalElem.textContent = "$0";
        return;
    }

    // Generar las filas del HTML de forma declarativa con .map()
    contenedor.innerHTML = carrito.map(item => `
        <tr>
            <td>
                <strong>${item.encuentro}</strong><br>
                <small class="text-muted">${item.fecha}</small>
            </td>
            <td><span class="badge bg-secondary">${item.localidad}</span></td>
            <td>$${item.precio.toLocaleString("es-CL")}</td>
            <td class="text-center">
                <button onclick="eliminarDelCarrito(${item.idUnico})" class="btn btn-outline-danger btn-sm" title="Eliminar">🗑️</button>
            </td>
        </tr>
    `).join("");

    if (totalElem) {
        totalElem.textContent = `$${calcularTotal(carrito).toLocaleString("es-CL")}`;
    }
}

// Inicialización automática
document.addEventListener("DOMContentLoaded", () => {
    actualizarBadge();
    renderizarCarrito();
});