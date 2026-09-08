/**
 * carrito.js - Gestión del carrito de e-Tickets para LIF
 */

const KEY_CARRITO = "LIF_CARRITO_ENTRADAS";

const obtenerCarrito = () => JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];

const guardarCarrito = (carrito) => {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
    actualizarBadgeCarrito();
};

function agregarAlCarrito(idPartido, tipoLocalidad = "Galería General", precio = 3000) {
    const carrito = obtenerCarrito();
    const partidos = (typeof DATOS_LIF !== "undefined" && DATOS_LIF.partidos) ? DATOS_LIF.partidos : [];
    const partido = partidos.find(p => p.id === Number(idPartido)) || {
        id: idPartido,
        local: "Partido LIF",
        visita: "Fecha Oficial",
        fecha: "Próxima Fecha"
    };

    const item = {
        idUnico: Date.now() + Math.floor(Math.random() * 1000),
        partidoId: partido.id,
        encuentro: `${partido.local} vs. ${partido.visita}`,
        localidad: tipoLocalidad,
        precio: Number(precio),
        fecha: partido.fecha
    };

    carrito.push(item);
    guardarCarrito(carrito);
    alert(`🎟️ Entrada agregada al carrito: ${item.encuentro} (${item.localidad})`);
}

function eliminarDelCarrito(idUnico) {
    const carrito = obtenerCarrito().filter(item => item.idUnico !== idUnico);
    guardarCarrito(carrito);
    if (typeof renderizarCarrito === "function") renderizarCarrito();
}

function vaciarCarrito() {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem(KEY_CARRITO);
        actualizarBadgeCarrito();
        if (typeof renderizarCarrito === "function") renderizarCarrito();
    }
}

function finalizarCompra() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("🎉 ¡Compra realizada con éxito! Tus e-Tickets han sido generados.");
    localStorage.removeItem(KEY_CARRITO);
    actualizarBadgeCarrito();
    if (typeof renderizarCarrito === "function") renderizarCarrito();
}

function actualizarBadgeCarrito() {
    const totalItems = obtenerCarrito().length;
    document.querySelectorAll(".badge-carrito").forEach(badge => {
        badge.textContent = totalItems;
    });
}

function renderizarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalElem = document.getElementById("total-carrito");
    if (!contenedor) return;

    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";

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

    let total = 0;
    contenedor.innerHTML = carrito.map(item => {
        total += item.precio;
        return `
            <tr>
                <td><strong>${item.encuentro}</strong><br><small class="text-muted">${item.fecha}</small></td>
                <td><span class="badge bg-secondary">${item.localidad}</span></td>
                <td>$${item.precio.toLocaleString("es-CL")}</td>
                <td class="text-center">
                    <button onclick="eliminarDelCarrito(${item.idUnico})" class="btn btn-outline-danger btn-sm" title="Eliminar">🗑️</button>
                </td>
            </tr>`;
    }).join("");

    if (totalElem) totalElem.textContent = `$${total.toLocaleString("es-CL")}`;
}

// Inicialización automática al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    actualizarBadgeCarrito();
    renderizarCarrito();
});