/**
 * datos.js - Base de datos simulada para la Liga Independiente de Fútbol (LIF)
 */

const DATOS_LIF = {
    equipos: [
        { id: 1, nombre: "Mónica FC", categoria: "Senior / Legendarios" },
        { id: 2, nombre: "Athletic Club", categoria: "Junior" },
        { id: 3, nombre: "Los Cabros FC", categoria: "Junior" },
        { id: 4, nombre: "Stade Francais", categoria: "Junior" },
        { id: 5, nombre: "Mohicanos", categoria: "Senior" },
        { id: 6, nombre: "Inter de Santiago", categoria: "Senior" },
        { id: 7, nombre: "Cracks FC", categoria: "Senior" },
        { id: 8, nombre: "Coyotes FC", categoria: "Diamante" },
        { id: 9, nombre: "Caleuche FC", categoria: "Dorada" }
    ],

    localidades: [
        { id: "galeria", nombre: "Galería General", precio: 3000, desc: "Acceso general a gradas laterales" },
        { id: "tribuna", nombre: "Tribuna Preferencial", precio: 5000, desc: "Ubicación central techada" },
        { id: "socio", nombre: "Pase Socio / Estudiante", precio: 1500, desc: "50% de descuento abonados" }
    ],

    partidos: [
        {
            id: 101,
            local: "Mónica FC",
            visita: "Athletic Club",
            fecha: "Sábado 12 Sep 2026",
            hora: "15:00",
            cancha: "Cancha 1 (F11)",
            precioBase: 3000
        },
        {
            id: 102,
            local: "Los Cabros FC",
            visita: "Stade Francais",
            fecha: "Sábado 12 Sep 2026",
            hora: "17:30",
            cancha: "Cancha 2 (F11)",
            precioBase: 3000
        },
        {
            id: 103,
            local: "Mohicanos",
            visita: "Inter de Santiago",
            fecha: "Domingo 13 Sep 2026",
            hora: "11:00",
            cancha: "Cancha 3 (F11)",
            precioBase: 3000
        }
    ],

    noticias: [
        {
            id: 1,
            titulo: "Cracks FC toma el liderazgo de la Serie Senior",
            categoria: "Serie Senior",
            fecha: "06 Sep 2026",
            resumen: "El conjunto de Cracks FC se posicionó en la cima tras una jornada electrizante."
        },
        {
            id: 2,
            titulo: "Stade Francais da un golpe de autoridad con goleada 5-1",
            categoria: "Serie Junior",
            fecha: "05 Sep 2026",
            resumen: "Demostración contundente de eficacia defensiva y ofensiva ante Athletic Club."
        }
    ]
};