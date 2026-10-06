/**
 * ============================================================================
 * datos.js - Gestor de Datos y Persistencia Local (LIF)
 * ============================================================================
 */

const KEY_PARTIDOS = "LIF_PARTIDOS_DATA";
const KEY_NOTICIAS = "LIF_NOTICIAS_DATA";

// Datos por defecto para inicializar el sistema
const DATOS_INICIALES = Object.freeze({
    partidos: [
        {
            id: 101,
            local: "Zánganos FC",
            visita: "Mónica FC",
            fecha: "2026-09-12",
            hora: "14:00",
            cancha: "Cancha 1 (F11)",
            estado: "Por jugar",
            precioBase: 3000
        },
        {
            id: 102,
            local: "Cracks FC",
            visita: "Inter Santiago",
            fecha: "2026-09-12",
            hora: "16:00",
            cancha: "Cancha 1 (F11)",
            estado: "Destacado",
            precioBase: 7000
        },
        {
            id: 103,
            local: "Unión Cordillera",
            visita: "Mohicanos",
            fecha: "2026-09-12",
            hora: "18:00",
            cancha: "Cancha 2 (F11)",
            estado: "Por jugar",
            precioBase: 3000
        }
    ],
    noticias: [
        {
            id: 1,
            titulo: "Cracks FC toma el liderazgo de la Serie Senior",
            categoria: "Serie Senior",
            fecha: "06 Sep 2026",
            resumen: "El conjunto de Cracks FC se posicionó en la cima tras una jornada electrizante.",
            imagen: "assets/images/estadio-bg.jpg"
        },
        {
            id: 2,
            titulo: "Stade Francais da un golpe de autoridad con goleada 5-1",
            categoria: "Serie Junior",
            fecha: "05 Sep 2026",
            resumen: "Demostración contundente de eficacia defensiva y ofensiva ante Athletic Club.",
            imagen: "assets/images/estadio-bg.jpg"
        }
    ]
});

// ==========================================
// 1. GESTIÓN DE PARTIDOS
// ==========================================

const obtenerPartidos = () => {
    const data = localStorage.getItem(KEY_PARTIDOS);
    if (!data) {
        localStorage.setItem(KEY_PARTIDOS, JSON.stringify(DATOS_INICIALES.partidos));
        return DATOS_INICIALES.partidos;
    }
    return JSON.parse(data);
};

const guardarPartido = (nuevoPartido) => {
    const partidos = obtenerPartidos();
    const partidoCompleto = {
        id: Date.now(),
        ...nuevoPartido
    };
    partidos.push(partidoCompleto);
    localStorage.setItem(KEY_PARTIDOS, JSON.stringify(partidos));
    return partidoCompleto;
};

const eliminarPartido = (id) => {
    const partidos = obtenerPartidos().filter(p => p.id !== Number(id));
    localStorage.setItem(KEY_PARTIDOS, JSON.stringify(partidos));
};

// ==========================================
// 2. GESTIÓN DE NOTICIAS
// ==========================================

const obtenerNoticias = () => {
    const data = localStorage.getItem(KEY_NOTICIAS);
    if (!data) {
        localStorage.setItem(KEY_NOTICIAS, JSON.stringify(DATOS_INICIALES.noticias));
        return DATOS_INICIALES.noticias;
    }
    return JSON.parse(data);
};

const guardarNoticia = (nuevaNoticia) => {
    const noticias = obtenerNoticias();
    const noticiaCompleta = {
        id: Date.now(),
        fecha: new Date().toLocaleDateString("es-CL", { day: '2-digit', month: 'short', year: 'numeric' }),
        ...nuevaNoticia
    };
    noticias.unshift(noticiaCompleta);
    localStorage.setItem(KEY_NOTICIAS, JSON.stringify(noticias));
    return noticiaCompleta;
};

const eliminarNoticia = (id) => {
    const noticias = obtenerNoticias().filter(n => n.id !== Number(id));
    localStorage.setItem(KEY_NOTICIAS, JSON.stringify(noticias));
};