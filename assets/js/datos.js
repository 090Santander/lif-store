// ==========================================
// CENTRAL DE DATOS LIF (localStorage)
// ==========================================

const PARTIDOS_INICIALES = [
    {
        id: 1,
        equipoLocal: "Cracks FC",
        equipoVisitante: "Zánganos FC",
        fecha: "SÁBADO 12 SEPTIEMBRE",
        hora: "16:00 hrs",
        sede: "Sede Principal",
        fase: "Gran Final",
        precio: 7000,
        descripcion: "Se define el campeonato. Aforo máximo 500 personas."
    },
    {
        id: 2,
        equipoLocal: "Los Leones",
        equipoVisitante: "Norte FC",
        fecha: "DOMINGO 13 SEPTIEMBRE",
        hora: "10:00 hrs",
        sede: "Sede Norte",
        fase: "Semifinal Junior",
        precio: 4000,
        descripcion: "Clásico de barrio. Ambiente familiar."
    }
];

const JUGADORES_INICIALES = [
    { id: 1, nombre: "Carlos Pérez", equipo: "Cracks FC", posicion: "Delantero", dorsal: 9 },
    { id: 2, nombre: "Matías Silva", equipo: "Zánganos FC", posicion: "Mediocampista", dorsal: 10 }
];

// --- FUNCIONES PARTIDOS Y ENTRADAS ---
function obtenerPartidos() {
    const data = localStorage.getItem('lif_partidos');
    if (!data) {
        localStorage.setItem('lif_partidos', JSON.stringify(PARTIDOS_INICIALES));
        return PARTIDOS_INICIALES;
    }
    return JSON.parse(data);
}

function guardarPartido(partido) {
    const partidos = obtenerPartidos();
    partido.id = Date.now();
    partidos.push(partido);
    localStorage.setItem('lif_partidos', JSON.stringify(partidos));
}

// --- FUNCIONES JUGADORES ---
function obtenerJugadores() {
    const data = localStorage.getItem('lif_jugadores');
    if (!data) {
        localStorage.setItem('lif_jugadores', JSON.stringify(JUGADORES_INICIALES));
        return JUGADORES_INICIALES;
    }
    return JSON.parse(data);
}

function guardarJugador(jugador) {
    const jugadores = obtenerJugadores();
    jugador.id = Date.now();
    jugadores.push(jugador);
    localStorage.setItem('lif_jugadores', JSON.stringify(jugadores));
}