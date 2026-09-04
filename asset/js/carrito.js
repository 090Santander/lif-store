// Gestión del carrito en localStorage

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito_lif')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito_lif', JSON.stringify(carrito));
    actualizarInsigniaCarrito();
}

function agregarAlCarrito(idProducto) {
    const producto = productosData.find(p => p.id === idProducto);
    if (!producto) return;

    let carrito = obtenerCarrito();
    const existe = carrito.find(p => p.id === idProducto);

    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    alert(`"${producto.nombre}" se agregó al carrito.`);
}

function eliminarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(p => p.id !== idProducto);
    guardarCarrito(carrito);
    renderizarCarrito();
}

function actualizarCantidad(idProducto, cantidad) {
    let carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === idProducto);
    if (item) {
        item.cantidad = parseInt(cantidad) || 1;
        if (item.cantidad <= 0) item.cantidad = 1;
    }
    guardarCarrito(carrito);
    renderizarCarrito();
}

function actualizarInsigniaCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelectorAll('.badge-carrito').forEach(el => {
        el.textContent = totalItems;
    });
}

function renderizarCarrito() {
    const contenedor = document.getElementById('lista-carrito');
    const totalEl = document.getElementById('total-carrito');
    const vacioEl = document.getElementById('carrito-vacio');
    
    if (!contenedor) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = '';
        if (vacioEl) vacioEl.classList.remove('d-none');
        if (totalEl) totalEl.textContent = '$0';
        return;
    }

    if (vacioEl) vacioEl.classList.add('d-none');

    let html = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        html += `
            <div class="card mb-3 p-3 shadow-sm">
                <div class="row align-items-center">
                    <div class="col-3 col-md-2">
                        <img src="${item.imagen}" class="img-fluid rounded" alt="${item.nombre}">
                    </div>
                    <div class="col-9 col-md-4">
                        <h5 class="h6 mb-1">${item.nombre}</h5>
                        <p class="small text-muted mb-0">$${item.precio.toLocaleString('es-CL')}</p>
                    </div>
                    <div class="col-6 col-md-3 mt-2 mt-md-0">
                        <input type="number" min="1" class="form-control form-control-sm" value="${item.cantidad}" onchange="actualizarCantidad(${item.id}, this.value)">
                    </div>
                    <div class="col-6 col-md-3 text-end mt-2 mt-md-0">
                        <span class="fw-bold d-block">$${subtotal.toLocaleString('es-CL')}</span>
                        <button class="btn btn-sm btn-outline-danger mt-1" onclick="eliminarDelCarrito(${item.id})">Quitar</button>
                    </div>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
}