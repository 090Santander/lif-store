/**
 * =======================================================================
 * ARCHIVO PRINCIPAL DE LA APLICACIÓN (app.js)
 * Maneja la interfaz de usuario y el renderizado dinámico.
 * =======================================================================
 */

// 1. INICIALIZADOR
document.addEventListener('DOMContentLoaded', () => {
    configurarMenuNavegacion();
    configurarModoOscuro();
    configurarCierreDeSesion();

    renderizarNoticias();
    renderizarPartidos();
    renderizarJugadores();
    renderizarTablaPosiciones();
});

/**
 * =======================================================================
 * 2. FUNCIONES DE INTERFAZ
 * =======================================================================
 */
function configurarMenuNavegacion() {
    if (typeof DatosLIF === 'undefined') return;

    const usuario = DatosLIF.getUsuario();
    const linksInvitado = document.querySelectorAll('.link-invitado');
    const linksUsuario = document.querySelectorAll('.link-usuario');
    const linksAdmin = document.querySelectorAll('.link-admin');

    if (usuario) {
        linksInvitado.forEach(el => el.classList.add('d-none'));
        linksUsuario.forEach(el => el.classList.remove('d-none'));

        if (usuario.rol === 'admin') {
            linksAdmin.forEach(el => el.classList.remove('d-none'));
        } else {
            linksAdmin.forEach(el => el.classList.add('d-none'));
        }
    } else {
        linksInvitado.forEach(el => el.classList.remove('d-none'));
        linksUsuario.forEach(el => el.classList.add('d-none'));
        linksAdmin.forEach(el => el.classList.add('d-none'));
    }
}

function configurarCierreDeSesion() {
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-cerrar-sesion')) {
            e.preventDefault();
            DatosLIF.cerrarSesion();
            alert('Has cerrado sesión correctamente.');
            window.location.href = 'index.html';
        }
    });
}

function configurarModoOscuro() {
    const btnDarkMode = document.getElementById('btn-dark-mode');
    if (!btnDarkMode) return;

    btnDarkMode.addEventListener('click', () => {
        const temaActual = document.documentElement.getAttribute('data-bs-theme');
        const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-bs-theme', nuevoTema);
        btnDarkMode.textContent = nuevoTema === 'dark' ? '☀️' : '🌙';
    });
}

/**
 * =======================================================================
 * 3. RENDERIZADO DE NOTICIAS (SIN IMÁGENES)
 * =======================================================================
 */
function renderizarNoticias() {
    const contenedorPrincipal = document.getElementById('contenedor-noticia') || document.getElementById('contenedor-noticias');
    const contenedorGrilla = document.getElementById('contenedor-noticias-grid');
    
    if (!contenedorPrincipal) return;

    const noticiasDatos = (typeof DatosLIF !== 'undefined' && typeof DatosLIF.get === 'function') 
        ? (DatosLIF.get('noticias') || []) 
        : [];

    if (!noticiasDatos || noticiasDatos.length === 0) {
        contenedorPrincipal.innerHTML = `
            <div class="card border-0 shadow-sm rounded-4 p-5 text-center text-muted bg-white">
                <p class="fs-5 mb-0">📰 No hay noticias publicadas en este momento.</p>
            </div>`;
        if (contenedorGrilla) contenedorGrilla.innerHTML = '';
        return;
    }

    const noticiaDestacada = noticiasDatos.find(n => n.destacada) || noticiasDatos[0];
    contenedorPrincipal.innerHTML = crearPlantillaNoticiaDestacada(noticiaDestacada);

    if (contenedorGrilla) {
        const noticiasRestantes = noticiasDatos.filter(n => String(n.id) !== String(noticiaDestacada.id));
        contenedorGrilla.innerHTML = noticiasRestantes.map(crearPlantillaNoticiaGrilla).join('');
    }
}

function crearPlantillaNoticiaDestacada(noticia) {
    const titulo = noticia.titulo || "Noticia LIF";
    const cuerpo = noticia.resumen || noticia.contenido || noticia.extracto || "Sin descripción disponible.";
    const categoria = noticia.categoria || "Oficial";
    const fecha = noticia.fecha || noticia.tiempo || "Reciente";

    return `
        <div class="card border-0 shadow rounded-4 card-noticia bg-white overflow-hidden p-2 p-lg-3">
            <div class="card-body p-4 p-lg-5">
                <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                    <span class="badge bg-success text-white rounded-pill px-3 py-2 fw-bold shadow-sm">${categoria}</span>
                    <small class="text-success fw-bold"><span aria-hidden="true">📅</span> ${fecha}</small>
                </div>
                <h2 class="card-title fw-black display-6 mb-3 text-dark lh-sm">${titulo}</h2>
                <p class="card-text text-muted fs-5 mb-4">${cuerpo}</p>
                <a href="#" class="btn btn-warning rounded-pill px-4 fw-bold text-dark shadow-sm">Leer artículo completo →</a>
            </div>
        </div>
    `;
}

function crearPlantillaNoticiaGrilla(noticia) {
    const titulo = noticia.titulo || "Noticia LIF";
    const cuerpo = noticia.resumen || noticia.contenido || noticia.extracto || "Sin descripción disponible.";
    const categoria = noticia.categoria || "Oficial";
    const fecha = noticia.fecha || noticia.tiempo || "Reciente";

    return `
        <div class="col">
            <div class="card h-100 border-0 shadow-sm rounded-4 card-noticia bg-white d-flex flex-column overflow-hidden">
                <div class="card-body p-4 d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                        <span class="badge bg-dark text-warning rounded-pill px-3 py-2 border border-warning shadow">${categoria}</span>
                        <small class="text-success fw-bold"><span aria-hidden="true">📅</span> ${fecha}</small>
                    </div>
                    <h3 class="h5 card-title fw-bold text-dark mb-3 lh-base">${titulo}</h3>
                    <p class="card-text text-muted small flex-grow-1">${cuerpo}</p>
                    <a href="#" class="btn btn-outline-success rounded-pill btn-sm fw-bold align-self-start mt-3 px-4">Leer más</a>
                </div>
            </div>
        </div>
    `;
}

/**
 * =======================================================================
 * 4. RENDERIZADO DE PARTIDOS
 * =======================================================================
 */
function renderizarPartidos() {
    const contenedor = document.getElementById('contenedor-entradas');
    if (!contenedor) return;

    const partidos = (typeof DatosLIF !== 'undefined' && typeof DatosLIF.get === 'function') 
        ? (DatosLIF.get('partidos') || []) 
        : [];
    
    if (!partidos || partidos.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted col-12 py-4">No hay partidos disponibles para la compra de tickets en este momento.</p>';
        return;
    }

    contenedor.innerHTML = partidos.map(p => {
        const local = p.equipoLocal || p.local || "Equipo Local";
        const visita = p.equipoVisitante || p.visita || "Equipo Visitante";
        const precio = Number(p.precio) || 5000;
        const fase = (p.fase || "Oficial").replace(/'/g, "\\'");
        const fecha = p.fecha || "Próxima Fecha";
        const hora = p.hora ? `- ⏰ ${p.hora}` : '';
        const sede = p.sede ? `| 📍 ${p.sede}` : '';

        return `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm border-0 rounded-4">
                    <div class="card-body p-4 d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="fw-bold mb-1 text-dark">${local} <span class="text-muted small">vs</span> ${visita}</h5>
                            <p class="text-muted mb-2 small">📅 ${fecha} ${hora} ${sede}</p>
                            <span class="badge bg-success mb-3">${p.fase || "Oficial"}</span>
                        </div>
                        <div class="pt-3 border-top d-flex justify-content-between align-items-center">
                            <h4 class="fw-bold text-success mb-0">$${precio.toLocaleString('es-CL')}</h4>
                            <button class="btn btn-warning fw-bold rounded-pill px-3 text-dark" 
                                    onclick="window.agregarAlCarrito('${p.id}', '${fase}', ${precio})">
                                🎟️ Comprar Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * =======================================================================
 * 5. RENDERIZADO DE JUGADORES Y POSICIONES
 * =======================================================================
 */
function renderizarJugadores() {
    const contenedor = document.getElementById('contenedor-jugadores');
    if (!contenedor) return;

    const jugadores = (typeof DatosLIF !== 'undefined' && typeof DatosLIF.get === 'function') 
        ? (DatosLIF.get('jugadores') || []) 
        : [];
    
    if (!jugadores || jugadores.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted col-12 py-4">No hay jugadores registrados en la liga.</p>';
        return;
    }

    contenedor.innerHTML = jugadores.map(j => {
        const iniciales = (j.nombre || "J").split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        
        return `
        <div class="col-md-6 col-xl-4 mb-4">
            <div class="card border-0 shadow-sm h-100 rounded-4">
                <div class="card-body p-4 d-flex align-items-center gap-3">
                    <div class="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style="width: 60px; height: 60px; min-width: 60px;">
                        ${iniciales}
                    </div>
                    <div>
                        <span class="badge bg-success mb-1">${j.posicion || "Jugador"}</span>
                        <h5 class="fw-bold mb-0 text-dark">${j.nombre}</h5>
                        <small class="text-muted">${j.equipo || "LIF"} - Dorsal #${j.dorsal || "0"}</small>
                    </div>
                </div>
                <div class="card-footer bg-light border-0 d-flex justify-content-around text-center py-3 rounded-bottom-4">
                    <div><div class="fw-bold fs-5 text-dark">${j.pj || 0}</div><small class="text-muted">PJ</small></div>
                    <div><div class="fw-bold fs-5 text-success">${j.goles || 0}</div><small class="text-muted">Goles</small></div>
                    <div><div class="fw-bold fs-5 text-warning">${j.ta || 0}</div><small class="text-muted">TA</small></div>
                    <div><div class="fw-bold fs-5 text-danger">${j.tr || 0}</div><small class="text-muted">TR</small></div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function renderizarTablaPosiciones() {
    const tbody = document.getElementById('tabla-posiciones-body');
    if (!tbody) return;

    const posiciones = [
        { equipo: 'Cracks FC', pj: 10, pg: 8, pe: 1, pp: 1, dif: '+15', pts: 25, estado: 'campeon' },
        { equipo: 'Mónica FC', pj: 10, pg: 7, pe: 2, pp: 1, dif: '+10', pts: 23, estado: 'normal' },
        { equipo: 'Los Chupas FC', pj: 10, pg: 5, pe: 3, pp: 2, dif: '+2', pts: 18, estado: 'normal' },
        { equipo: 'Zánganos FC', pj: 10, pg: 2, pe: 2, pp: 6, dif: '-8', pts: 8, estado: 'riesgo' },
        { equipo: 'Matones FC', pj: 10, pg: 0, pe: 1, pp: 9, dif: '-19', pts: 1, estado: 'riesgo' }
    ];

    tbody.innerHTML = posiciones.map((eq, index) => {
        let claseFila = eq.estado === 'campeon' ? 'table-success border-success' : eq.estado === 'riesgo' ? 'table-danger border-danger' : '';
        let colorIndicador = eq.estado === 'campeon' ? 'bg-success' : eq.estado === 'riesgo' ? 'bg-danger' : 'bg-transparent';
        const iniciales = eq.equipo.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        return `
            <tr class="${claseFila}">
                <td class="fw-bold py-3">${index + 1}</td>
                <td class="text-start fw-bold text-dark text-nowrap">
                    <div class="d-flex align-items-center">
                        <span class="badge ${colorIndicador} rounded-circle p-1 me-2" style="width: 10px; height: 10px;"></span>
                        <div class="bg-warning text-dark fw-bold rounded-circle d-flex justify-content-center align-items-center me-2 shadow-sm" style="width: 30px; height: 30px; font-size: 12px; flex-shrink: 0;">
                            ${iniciales}
                        </div>
                        ${eq.equipo}
                    </div>
                </td>
                <td class="py-3">${eq.pj}</td>
                <td class="py-3">${eq.pg}</td>
                <td class="py-3">${eq.pe}</td>
                <td class="py-3">${eq.pp}</td>
                <td class="py-3">${eq.dif}</td>
                <td class="py-3 fw-black fs-6 ${eq.estado === 'campeon' ? 'text-success' : 'text-dark'}">${eq.pts}</td>
            </tr>
        `;
    }).join('');
}

// Exposición global
window.renderizarNoticias = renderizarNoticias;
window.renderizarPartidos = renderizarPartidos;