/**
 * carrito.js - Gestión del carrito de e-Tickets para LIF
 */

const KEY_CARRITO = "LIF_CARRITO_ENTRADAS";

// Obtener elementos del carrito
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];
}

// Guardar carrito y actualizar UI
function guardarCarrito(carrito) {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
    actualizarBadgeCarrito();
}

// Agregar ticket al carrito
function agregarAlCarrito(idPartido, tipoLocalidad = "Galería General", precio = 3000) {
    let carrito = obtenerCarrito();
    let partido = DATOS_LIF.partidos.find(p => p.id === idPartido) || {
        id: idPartido,
        local: "Partido LIF",
        visita: "Fecha Oficial",
        fecha: "Próxima Fecha"
    };

    let item = {
        idUnico: Date.now(),
        partidoId: partido.id,
        encuentro: `${partido.local} vs. ${partido.visita}`,
        localidad: tipoLocalidad,
        precio: precio,
        fecha: partido.fecha
    };

    carrito.push(item);
    guardarCarrito(carrito);
    alert(`🎟️ Entrada agregada: ${item.encuentro} (${item.localidad})`);
}

// Eliminar ticket por ID
function eliminarDelCarrito(idUnico) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.idUnico !== idUnico);
    guardarCarrito(carrito);
    if (typeof renderizarCarrito === "function") renderizarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    localStorage.removeItem(KEY_CARRITO);
    actualizarBadgeCarrito();
    if (typeof renderizarCarrito === "function") renderizarCarrito();
}

// Actualizar contador del badge en el Navbar
function actualizarBadgeCarrito() {
    const badges = document.querySelectorAll(".badge-carrito");
    const totalItems = obtenerCarrito().length;
    badges.forEach(badge => {
        badge.textContent = totalItems;
    });
}

// Renderizar tabla del carrito si la página lo requiere (carrito.html)
function renderizarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalElem = document.getElementById("total-carrito");
    if (!contenedor) return;

    let carrito = obtenerCarrito();
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-muted">
                    No tienes entradas agregadas a tu carrito.
                </td>
            </tr>`;
        if (totalElem) totalElem.textContent = "$0";
        return;
    }

    let total = 0;
    carrito.forEach(item => {
        total += item.precio;
        contenedor.innerHTML += `
            <tr>
                <td><strong>${item.encuentro}</strong><br><small class="text-muted">${item.fecha}</small></td>
                <td><span class="badge bg-secondary">${item.localidad}</span></td>
                <td>$${item.precio.toLocaleString("es-CL")}</td>
                <td class="text-center">
                    <button onclick="eliminarDelCarrito(${item.idUnico})" class="btn btn-outline-danger btn-sm">🗑️</button>
                </td>
            </tr>`;
    });

    if (totalElem) totalElem.textContent = `$${total.toLocaleString("es-CL")}`;
}