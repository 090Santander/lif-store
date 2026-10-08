const DatosLIF = {
    init() {
        // Inicializar arrays vacíos si no existen
        if (!localStorage.getItem('lif_noticias')) {
            localStorage.setItem('lif_noticias', JSON.stringify([]));
        }
        if (!localStorage.getItem('lif_jugadores')) {
            localStorage.setItem('lif_jugadores', JSON.stringify([]));
        }
        if (!localStorage.getItem('lif_partidos')) {
            localStorage.setItem('lif_partidos', JSON.stringify([]));
        }
        if (!localStorage.getItem('lif_solicitudes')) {
            localStorage.setItem('lif_solicitudes', JSON.stringify([]));
        }
    },

    get(clave) {
        return JSON.parse(localStorage.getItem(`lif_${clave}`)) || [];
    },

    guardar(clave, lista) {
        localStorage.setItem(`lif_${clave}`, JSON.stringify(lista));
    },

    agregar(clave, item) {
        const lista = this.get(clave);
        item.id = Date.now(); // Generar ID único
        lista.push(item);
        this.guardar(clave, lista);
        return item;
    },

    eliminar(clave, id) {
        const lista = this.get(clave).filter(item => item.id !== id);
        this.guardar(clave, lista);
    },

    // --- MANEJO DE SESIONES DE USUARIO ---
    setUsuario(usuario) {
        localStorage.setItem("LIF_USUARIO_ACTIVO", JSON.stringify(usuario));
    },

    getUsuario() {
        return JSON.parse(localStorage.getItem("LIF_USUARIO_ACTIVO")) || null;
    },

    cerrarSesion() {
        localStorage.removeItem("LIF_USUARIO_ACTIVO");
    }
};

// Ejecutar inicialización al cargar el archivo
DatosLIF.init();