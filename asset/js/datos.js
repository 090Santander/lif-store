// Base de datos local de productos
const productosData = [
    {
        id: 1,
        nombre: "Camiseta Oficial LIF 2026",
        precio: 24990,
        categoria: "Camisetas",
        destacado: true,
        imagen: "asset/images/cancha11.jpg",
        descripcion: "Camiseta oficial de la liga con tecnología de secado rápido."
    },
    {
        id: 2,
        nombre: "Balón Profesional Liga N°5",
        precio: 19990,
        categoria: "Balones",
        destacado: true,
        imagen: "asset/images/cancha11.jpg",
        descripcion: "Balón termosellado de alta durabilidad para pasto sintético y natural."
    },
    {
        id: 3,
        nombre: "Zapatillas Futbolito Turf",
        precio: 39990,
        categoria: "Calzado",
        destacado: true,
        imagen: "asset/images/cancha11.jpg",
        descripcion: "Suela de goma multitaco para máximo agarre en cancha sintética."
    },
    {
        id: 4,
        nombre: "Guantes de Arquero Grip Pro",
        precio: 15990,
        categoria: "Accesorios",
        destacado: false,
        imagen: "asset/images/cancha11.jpg",
        descripcion: "Palma de látex de alto agarre con varillas de protección."
    }
];

// Datos de regiones y comunas para el registro
const regionesData = [
    {
        region: "Región Metropolitana",
        comunas: ["Santiago", "San Joaquín", "Providencia", "Puente Alto", "Maipú"]
    },
    {
        region: "Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"]
    },
    {
        region: "Biobío",
        comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Los Ángeles"]
    }
];