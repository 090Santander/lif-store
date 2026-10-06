// --- DATOS POR DEFECTO ---
const noticiasIniciales = [
    {
        titulo: "Gran Final de la Liguilla 2026",
        categoria: "Oficial",
        fecha: "Hoy",
        resumen: "Este sábado se define el campeón del torneo de clausura entre Cracks FC y Zánganos FC."
    }
];

const partidosIniciales = [
    {
        equipoLocal: "Cracks FC",
        equipoVisitante: "Zánganos FC",
        fecha: "SÁBADO 12 SEPTIEMBRE",
        hora: "16:00 hrs",
        sede: "Sede Principal",
        fase: "GRAN FINAL",
        precio: 7000,
        descripcion: "Se define el campeonato. Aforo máximo 500 personas."
    },
    {
        equipoLocal: "Los Leones",
        equipoVisitante: "Norte FC",
        fecha: "DOMINGO 13 SEPTIEMBRE",
        hora: "10:00 hrs",
        sede: "Sede Norte",
        fase: "SEMIFINAL JUNIOR",
        precio: 4000,
        descripcion: "Clásico de barrio. Ambiente familiar."
    }
];

const jugadoresIniciales = [
    { nombre: "Juan Román", equipo: "Cracks FC", posicion: "Mediocampista", dorsal: 10 }
];

// --- NOTICIAS ---
function obtenerNoticias() {
    const data = localStorage.getItem('lif_noticias');
    return data ? JSON.parse(data) : noticiasIniciales;
}
function guardarNoticia(noticia) {
    const noticias = obtenerNoticias();
    noticias.unshift(noticia);
    localStorage.setItem('lif_noticias', JSON.stringify(noticias));
}
function eliminarNoticia(index) {
    const noticias = obtenerNoticias();
    noticias.splice(index, 1);
    localStorage.setItem('lif_noticias', JSON.stringify(noticias));
}

// --- PARTIDOS ---
function obtenerPartidos() {
    const data = localStorage.getItem('lif_partidos');
    return data ? JSON.parse(data) : partidosIniciales;
}
function guardarPartido(partido) {
    const partidos = obtenerPartidos();
    partidos.unshift(partido);
    localStorage.setItem('lif_partidos', JSON.stringify(partidos));
}
function eliminarPartido(index) {
    const partidos = obtenerPartidos();
    partidos.splice(index, 1);
    localStorage.setItem('lif_partidos', JSON.stringify(partidos));
}

// --- JUGADORES ---
function obtenerJugadores() {
    const data = localStorage.getItem('lif_jugadores');
    return data ? JSON.parse(data) : jugadoresIniciales;
}
function guardarJugador(jugador) {
    const jugadores = obtenerJugadores();
    jugadores.push(jugador);
    localStorage.setItem('lif_jugadores', JSON.stringify(jugadores));
}
function eliminarJugador(index) {
    const jugadores = obtenerJugadores();
    jugadores.splice(index, 1);
    localStorage.setItem('lif_jugadores', JSON.stringify(jugadores));
}