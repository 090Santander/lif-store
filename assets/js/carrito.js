/**
 * ============================================================================
 * carrito.js - Gestión Completa del Carrito y e-Tickets (LIF)
 * ============================================================================
 */

window.KEY_CARRITO = "LIF_CARRITO_ENTRADAS";

// 1. Lectura y Escritura en LocalStorage
window.obtenerCarrito = function() {
    try {
        return JSON.parse(localStorage.getItem(window.KEY_CARRITO)) || [];
    } catch (e) {
        return [];
    }
};

window.guardarCarrito = function(carrito) {
    localStorage.setItem(window.KEY_CARRITO, JSON.stringify(carrito));
    if (typeof window.actualizarBadge === 'function') {
        window.actualizarBadge();
    }
    if (typeof window.renderizarCarrito === 'function') {
        window.renderizarCarrito();
    }
};

// 2. Actualizador del Contador en el Navbar
window.actualizarBadge = function() {
    const total = window.obtenerCarrito().length;
    document.querySelectorAll(".badge-carrito").forEach(b => {
        b.textContent = total;
    });
};

// 3. Agregar entrada al Carrito
window.agregarAlCarrito = function(idPartido, tipoLocalidad = "General", precio = 0) {
    let partido = null;
    if (typeof DatosLIF !== 'undefined' && typeof DatosLIF.get === 'function') {
        const partidos = DatosLIF.get('partidos') || [];
        partido = partidos.find(p => String(p.id) === String(idPartido));
    }

    const local = partido ? (partido.equipoLocal || partido.local || "LA LEGUA") : "LA LEGUA";
    const visita = partido ? (partido.equipoVisitante || partido.visita || "EL PINAR") : "EL PINAR";
    const fechaText = partido ? `${partido.fecha || ''} ${partido.hora || ''}`.trim() : "Próxima Fecha";
    const precioFinal = Number(precio) || (partido ? Number(partido.precio) : 6000);

    const nuevoTicket = {
        idUnico: Date.now() + Math.floor(Math.random() * 1000),
        encuentro: `${local} vs ${visita}`,
        localidad: tipoLocalidad || (partido ? partido.fase : "General"),
        precio: precioFinal,
        fecha: fechaText
    };

    const carritoActual = window.obtenerCarrito();
    carritoActual.push(nuevoTicket);
    window.guardarCarrito(carritoActual);

    alert(`🎟️ ¡Entrada agregada al carrito!\n${nuevoTicket.encuentro}`);
};

// 4. Eliminar entrada individual
window.eliminarDelCarrito = function(idUnico) {
    const carritoActual = window.obtenerCarrito();
    const nuevoCarrito = carritoActual.filter(item => item.idUnico !== idUnico);
    window.guardarCarrito(nuevoCarrito);
};

// 5. Cálculo y renderizado del resumen de precios
window.actualizarResumen = function(subtotal) {
    const cargo = subtotal > 0 ? subtotal * 0.10 : 0; // 10% cargo por servicio
    const total = subtotal + cargo;

    const domSubtotal = document.getElementById("resumen-subtotal");
    const domCargo = document.getElementById("resumen-cargo");
    const domTotal = document.getElementById("resumen-total");
    const btnProceder = document.querySelector('[data-bs-target="#modalPago"]');

    if (domSubtotal) domSubtotal.textContent = `$${subtotal.toLocaleString("es-CL")}`;
    if (domCargo) domCargo.textContent = `$${cargo.toLocaleString("es-CL")}`;
    if (domTotal) domTotal.textContent = `$${total.toLocaleString("es-CL")}`;
    if (btnProceder) btnProceder.disabled = subtotal === 0;
};

// 6. Dibujar las entradas en carrito.html
window.renderizarCarrito = function() {
    const contenedor = document.getElementById("lista-carrito");
    if (!contenedor) return;

    const carrito = window.obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `<div class="p-4 text-center text-muted">No tienes entradas agregadas a tu carrito.</div>`;
        window.actualizarResumen(0);
        return;
    }

    let subtotal = 0;
    contenedor.innerHTML = carrito.map(item => {
        subtotal += Number(item.precio) || 0;
        return `
            <div class="list-group-item p-4">
                <div class="row align-items-center g-3">
                    <div class="col-auto">
                        <span class="display-6 ${String(item.localidad).includes('VIP') ? 'text-warning' : 'text-success'} opacity-75">
                            ${String(item.localidad).includes('VIP') ? '🎫' : '🎟️'}
                        </span>
                    </div>
                    <div class="col">
                        <h5 class="mb-1 fw-bold text-dark">${item.encuentro}</h5>
                        <p class="mb-0 text-muted extra-small">${item.localidad} - ${item.fecha}</p>
                    </div>
                    <div class="col-12 col-sm-auto d-flex align-items-center gap-3">
                        <span class="fw-bold text-dark" style="width: 80px; text-align: right;">$${Number(item.precio).toLocaleString("es-CL")}</span>
                        <button onclick="window.eliminarDelCarrito(${item.idUnico})" class="btn btn-sm btn-outline-danger border-0" aria-label="Eliminar entrada">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    window.actualizarResumen(subtotal);
};

// 7. Procesar pago y vaciar el carrito
window.procesarPago = function(metodo) {
    if (window.obtenerCarrito().length === 0) return alert("Tu carrito está vacío.");

    alert(`🎉 ¡Pago vía ${metodo.toUpperCase()} exitoso! Tus e-Tickets han sido generados.`);

    const modalNode = document.getElementById('modalPago');
    if (modalNode && typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getInstance(modalNode) || new bootstrap.Modal(modalNode);
        modal.hide();
    }

    window.guardarCarrito([]);
};

// 8. Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    window.actualizarBadge();
    window.renderizarCarrito();

    const btnConfirmar = document.getElementById('btn-confirmar-pago');
    if (btnConfirmar) {
        btnConfirmar.onclick = () => {
            const radio = document.querySelector('input[name="metodoPago"]:checked');
            const metodo = radio ? radio.value : 'webpay';
            window.procesarPago(metodo);
        };
    }
});