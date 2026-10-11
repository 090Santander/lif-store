document.addEventListener('DOMContentLoaded', () => {

    if (typeof DatosLIF === 'undefined') {
        console.error('Error: DatosLIF no está cargado.');
        return;
    }

    // 1. PROTEGER RUTA (Solo Admin)
    const usuario = DatosLIF.getUsuario();
    if (!usuario || usuario.rol !== 'admin') {
        alert('⚠️ Acceso denegado: Esta vista es exclusiva para el Administrador.');
        window.location.href = 'index.html';
        return;
    }

    // Botón Cerrar Sesión del Header del Admin
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion-1');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            DatosLIF.cerrarSesion();
            alert('Has cerrado sesión correctamente.');
            window.location.href = 'index.html';
        });
    }

    // 2. RENDERIZADO
    function renderNoticias() {
        const noticias = DatosLIF.get('noticias');
        const listaTab1 = document.getElementById('lista-noticias-admin');
        const listaTab2 = document.getElementById('lista-noticias-partidos-admin');

        const htmlNoticias = noticias.length === 0
            ? '<li class="list-group-item text-muted">No hay noticias registradas.</li>'
            : noticias.map(n => `
                <li class="list-group-item d-flex justify-content-between align-items-start gap-2 py-3">
                    <div class="flex-grow-1">
                        <div class="fw-bold fs-6">${n.titulo}</div>
                        <span class="badge bg-success me-1">${n.categoria}</span>
                        <small class="text-muted">${n.fecha}</small>
                        <p class="mb-0 text-secondary small mt-1">${n.resumen}</p>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar-noticia ms-2" data-id="${n.id}">
                        Eliminar
                    </button>
                </li>
            `).join('');

        if (listaTab1) listaTab1.innerHTML = htmlNoticias;
        if (listaTab2) listaTab2.innerHTML = htmlNoticias;
    }

    function renderPartidos() {
        const partidos = DatosLIF.get('partidos');
        const listaPartidos = document.getElementById('lista-partidos-admin');
        if (!listaPartidos) return;

        if (partidos.length === 0) {
            listaPartidos.innerHTML = '<li class="list-group-item text-muted">No hay partidos registrados.</li>';
            return;
        }

        listaPartidos.innerHTML = partidos.map(p => `
            <li class="list-group-item d-flex justify-content-between align-items-center gap-2 py-3">
                <div>
                    <div class="fw-bold">${p.equipoLocal} vs ${p.equipoVisitante}</div>
                    <small class="text-muted d-block">${p.fecha} - ${p.hora} | ${p.sede}</small>
                    <span class="badge bg-primary mt-1">${p.fase}</span>
                    <span class="badge bg-success mt-1">$${Number(p.precio).toLocaleString('es-CL')}</span>
                </div>
                <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar-partido" data-id="${p.id}">
                    Eliminar
                </button>
            </li>
        `).join('');
    }

    function renderJugadores() {
        const jugadores = DatosLIF.get('jugadores');
        const tablaJugadores = document.getElementById('lista-jugadores-admin');
        if (!tablaJugadores) return;

        if (jugadores.length === 0) {
            tablaJugadores.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No hay jugadores registrados.</td></tr>';
            return;
        }

        tablaJugadores.innerHTML = jugadores.map(j => `
            <tr>
                <th scope="row">#${j.dorsal}</th>
                <td class="fw-bold">${j.nombre}</td>
                <td>${j.equipo}</td>
                <td><span class="badge bg-secondary">${j.posicion}</span></td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar-jugador" data-id="${j.id}">
                        Eliminar
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // 3. CAPTURA DE FORMULARIOS
    const formNoticia = document.getElementById('form-nueva-noticia');
    if (formNoticia) {
        formNoticia.addEventListener('submit', (e) => {
            e.preventDefault();
            DatosLIF.agregar('noticias', {
                titulo: document.getElementById('n-titulo').value.trim(),
                categoria: document.getElementById('n-categoria').value,
                fecha: document.getElementById('n-fecha').value.trim(),
                resumen: document.getElementById('n-resumen').value.trim()
            });
            formNoticia.reset();
            renderNoticias();
        });
    }

    const formNoticiaPartido = document.getElementById('form-noticia-partido');
    if (formNoticiaPartido) {
        formNoticiaPartido.addEventListener('submit', (e) => {
            e.preventDefault();
            DatosLIF.agregar('noticias', {
                titulo: document.getElementById('np-titulo').value.trim(),
                categoria: document.getElementById('np-categoria').value,
                fecha: document.getElementById('np-fecha').value.trim(),
                resumen: document.getElementById('np-resumen').value.trim()
            });
            formNoticiaPartido.reset();
            renderNoticias();
        });
    }

    const formPartido = document.getElementById('form-nuevo-partido');
    if (formPartido) {
        formPartido.addEventListener('submit', (e) => {
            e.preventDefault();
            DatosLIF.agregar('partidos', {
                equipoLocal: document.getElementById('p-local').value.trim(),
                equipoVisitante: document.getElementById('p-visitante').value.trim(),
                fecha: document.getElementById('p-fecha').value.trim(),
                hora: document.getElementById('p-hora').value.trim(),
                sede: document.getElementById('p-sede').value.trim(),
                fase: document.getElementById('p-fase').value.trim(),
                precio: Number(document.getElementById('p-precio').value),
                descripcion: document.getElementById('p-desc').value.trim()
            });
            formPartido.reset();
            renderPartidos();
        });
    }

    const formJugador = document.getElementById('form-nuevo-jugador');
    if (formJugador) {
        formJugador.addEventListener('submit', (e) => {
            e.preventDefault();
            DatosLIF.agregar('jugadores', {
                nombre: document.getElementById('j-nombre').value.trim(),
                equipo: document.getElementById('j-equipo').value.trim(),
                posicion: document.getElementById('j-posicion').value,
                dorsal: document.getElementById('j-dorsal').value
            });
            formJugador.reset();
            renderJugadores();
        });
    }

    // 4. ELIMINACIÓN DE REGISTROS
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar-noticia')) {
            if (confirm('¿Eliminar noticia?')) {
                DatosLIF.eliminar('noticias', Number(e.target.dataset.id));
                renderNoticias();
            }
        }
        if (e.target.classList.contains('btn-eliminar-partido')) {
            if (confirm('¿Eliminar partido?')) {
                DatosLIF.eliminar('partidos', Number(e.target.dataset.id));
                renderPartidos();
            }
        }
        if (e.target.classList.contains('btn-eliminar-jugador')) {
            if (confirm('¿Eliminar jugador?')) {
                DatosLIF.eliminar('jugadores', Number(e.target.dataset.id));
                renderJugadores();
            }
        }
    });

    renderNoticias();
    renderPartidos();
    renderJugadores();
});
// 1. Modifica la parte donde dibujas la tabla en el Admin para agregar el botón "Stats":
function renderizarTablaJugadoresAdmin() {
    const tbody = document.getElementById('tbody-jugadores-admin'); // Ajusta al ID de tu tabla
    if (!tbody) return;
    
    const jugadores = DatosLIF.get('jugadores');
    tbody.innerHTML = jugadores.map(j => `
        <tr>
            <td class="fw-bold">#${j.dorsal}</td>
            <td class="fw-bold text-dark">${j.nombre}</td>
            <td>${j.equipo}</td>
            <td><span class="badge bg-secondary">${j.posicion}</span></td>
            <td>
                <!-- NUEVO BOTÓN DE ESTADÍSTICAS -->
                <button class="btn btn-sm btn-primary rounded-pill fw-bold" onclick="abrirModalStats('${j.id}')">📊 Stats</button>
                <button class="btn btn-sm btn-outline-danger rounded-pill" onclick="eliminarJugador('${j.id}')">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// 2. Agrega estas dos funciones al final de tu archivo JS para manejar el Modal:
function abrirModalStats(idJugador) {
    const jugadores = DatosLIF.get('jugadores');
    const jugador = jugadores.find(j => j.id === idJugador);
    
    if (jugador) {
        document.getElementById('stat-jugador-id').value = jugador.id;
        document.getElementById('stat-jugador-nombre').innerText = `${jugador.nombre} (${jugador.equipo})`;
        
        // Cargar datos actuales o poner 0 por defecto
        document.getElementById('stat-pj').value = jugador.pj || 0;
        document.getElementById('stat-goles').value = jugador.goles || 0;
        document.getElementById('stat-ta').value = jugador.ta || 0;
        document.getElementById('stat-tr').value = jugador.tr || 0;
        
        // Mostrar el modal usando Bootstrap
        const modal = new bootstrap.Modal(document.getElementById('modalStatsJugador'));
        modal.show();
    }
}

function guardarEstadisticasJugador() {
    const id = document.getElementById('stat-jugador-id').value;
    const pj = parseInt(document.getElementById('stat-pj').value) || 0;
    const goles = parseInt(document.getElementById('stat-goles').value) || 0;
    const ta = parseInt(document.getElementById('stat-ta').value) || 0;
    const tr = parseInt(document.getElementById('stat-tr').value) || 0;

    const jugadores = DatosLIF.get('jugadores');
    const index = jugadores.findIndex(j => j.id === id);

    if (index !== -1) {
        // Actualizar jugador con las nuevas estadísticas
        jugadores[index] = { ...jugadores[index], pj, goles, ta, tr };
        DatosLIF.set('jugadores', jugadores);
        
        // Cerrar Modal
        const modalEl = document.getElementById('modalStatsJugador');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance.hide();
        
        alert('Estadísticas guardadas con éxito');
    }
}