// Renderizado general y eventos globales

document.addEventListener('DOMContentLoaded', () => {
    actualizarInsigniaCarrito();
    inicializarModoOscuro();
});

// Cambiador Modo Oscuro
function inicializarModoOscuro() {
    const btnModo = document.getElementById('btnModo');
    if (!btnModo) return;

    const modoGuardado = localStorage.getItem('modo_oscuro') === 'true';
    if (modoGuardado) {
        document.body.classList.add('bg-dark', 'text-white');
        btnModo.textContent = '☀️ Modo Claro';
    }

    btnModo.addEventListener('click', () => {
        document.body.classList.toggle('bg-dark');
        document.body.classList.toggle('text-white');
        const esOscuro = document.body.classList.contains('bg-dark');
        localStorage.setItem('modo_oscuro', esOscuro);
        btnModo.textContent = esOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    });
}

// Render de destacados en Home
function renderizarDestacadosHome() {
    const contenedor = document.getElementById('productos-destacados');
    if (!contenedor) return;

    const destacados = productosData.filter(p => p.destacado);
    contenedor.innerHTML = destacados.map(p => crearCardProducto(p)).join('');
}

// Render del catálogo completo
function renderizarCatalogo(categoriaFiltro = 'todas') {
    const contenedor = document.getElementById('grilla-productos');
    if (!contenedor) return;

    const filtrados = categoriaFiltro === 'todas' 
        ? productosData 
        : productosData.filter(p => p.categoria.toLowerCase() === categoriaFiltro.toLowerCase());

    contenedor.innerHTML = filtrados.map(p => crearCardProducto(p)).join('');
}

// Filtros por botón
function inicializarFiltroCategorias() {
    const botones = document.querySelectorAll('[data-filtro-categoria]');
    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botones.forEach(b => b.classList.replace('btn-primary', 'btn-outline-dark'));
            e.target.classList.replace('btn-outline-dark', 'btn-primary');
            renderizarCatalogo(e.target.dataset.filtroCategoria);
        });
    });
}

// Helper para crear cards HTML
function crearCardProducto(producto) {
    return `
        <div class="col-md-4 col-lg-3">
            <div class="card h-100 shadow-sm border-0">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary mb-2 w-auto align-self-start">${producto.categoria}</span>
                    <h5 class="card-title h6 fw-bold">${producto.nombre}</h5>
                    <p class="card-text small text-muted flex-grow-1">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="fw-bold text-primary">$${producto.precio.toLocaleString('es-CL')}</span>
                        <button class="btn btn-sm btn-primary" onclick="agregarAlCarrito(${producto.id})">Añadir 🛒</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}n