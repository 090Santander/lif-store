# ⚽ LIF - Liga Independiente de Fútbol

> Plataforma web oficial para la gestión, comunicación e interacción de la Liga Independiente de Fútbol (LIF). 

¡Hola! 👋 Bienvenidos al repositorio oficial de **LIF**. Somos **Renato Santander** y **Antonia Inostroza**, y desarrollamos este proyecto con el objetivo de modernizar la experiencia digital de nuestra liga. Diseñamos una interfaz intuitiva, rápida y escalable, pensada tanto para los jugadores y fanáticos como para la administración del torneo.

---

## ✨ Características Destacadas (Core Features)

Nos enfocamos en crear una experiencia de usuario (UX) fluida y segura, implementando soluciones limpias sin sobrecargar el proyecto con dependencias innecesarias:

* 🌙 **Modo Oscuro Persistente:** Implementación de temas dinámicos (Light/Dark) integrados con CSS Custom Properties y Bootstrap. El estado se gestiona a través del `localStorage` del navegador para recordar la preferencia del usuario en futuras sesiones.
* 🛡️ **Motor de Validación Custom (`validaciones.js`):** Desarrollamos un script de validación del lado del cliente altamente estricto:
  * **Algoritmo Módulo 11:** Verificación matemática en tiempo real para asegurar que el RUT/RUN chileno ingresado sea auténtico.
  * **Filtro de Dominios:** Restricción de acceso mediante expresiones regulares (Regex) para aceptar únicamente correos institucionales (`@duoc.cl`, `@profesor.duoc.cl`) o `@gmail.com`.
  * **Feedback Visual Inmediato:** Integración con las clases de estado de Bootstrap (`is-valid` / `is-invalid`) para guiar al usuario mientras escribe.
* 🧭 **Enrutamiento Visual Inteligente:** Script global (`app.js`) que lee el objeto `window.location` para iluminar automáticamente el enlace activo en la barra de navegación, mejorando la orientación dentro del sitio.
* 📱 **Arquitectura Mobile-First:** Diseño 100% responsivo que garantiza una visualización perfecta en smartphones, tablets y pantallas de escritorio.

---

## 🛠️ Stack Tecnológico

Optamos por un enfoque *Vanilla* combinado con el framework de UI líder en el mercado para garantizar un rendimiento óptimo:

* **HTML5:** Estructuración semántica para mejorar la accesibilidad y el SEO.
* **CSS3:** Estilos modulares utilizando variables (`:root`) para la gestión unificada de la paleta de colores corporativa.
* **Vanilla JavaScript (ES6+):** Lógica de negocio, manipulación del DOM y validaciones desarrolladas desde cero.
* **Bootstrap 5:** Sistema de grillas, componentes interactivos y utilidades responsivas.

---

## 📁 Arquitectura del Proyecto

El código está estructurado para ser fácilmente escalable y mantenible:

```text
lif-store/
├── assets/
│   ├── css/
│   │   └── estilos.css         # Reglas gráficas y variables del tema oscuro/claro
│   └── js/
│       ├── app.js              # Lógica global (Temas, UI, Navegación)
│       └── validaciones.js     # Módulo centralizado de seguridad y formularios
├── index.html                  # Landing page y vista principal
├── login.html                  # Módulo de autenticación
├── registro.html               # Creación de nuevas cuentas
├── contacto.html               # Canal de comunicación directa
├── solicitud.html              # Gestión de requerimientos administrativos
└── README.md                   # Documentación técnica
