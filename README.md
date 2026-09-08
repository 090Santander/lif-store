# ⚽ LIF 2.0 - Liga Independiente de Fútbol[cite: 1]

> Plataforma web dinámica, responsive y escalable que centraliza la gestión del torneo y transforma la experiencia del jugador mediante estadísticas avanzadas, automatización administrativa y módulos interactivos[cite: 1].

¡Hola! 👋 Bienvenidos al repositorio oficial de **LIF 2.0**[cite: 1]. Somos **Antonia Inostroza** y **Renato Santander**, y desarrollamos este proyecto para la asignatura FULLSTACK II con el docente ROBERTO MORENO[cite: 1].

---

## 🎯 El Problema y Nuestra Solución

Identificamos que la carga y visualización de resultados y tablas de posición en la página actual de la liga (lif.cl) es lenta y poco interactiva[cite: 1]. Además, tareas como la inscripción de jugadores, el control de tarjetas amarillas/rojas y la programación de fechas requieren una gestión administrativa ardua, haciendo que el acceso a la información sea confuso[cite: 1]. 

Para solucionar esto, desarrollamos **LIF 2.0**, un sistema que convierte la gestión manual y las planillas en papel en datos en tiempo real, ofreciendo una comunidad digital interconectada y una experiencia que motiva al usuario a navegar constantemente[cite: 1].

---

## ✨ Requisitos y Funcionalidades Core

El sistema fue diseñado cumpliendo estrictos estándares de la industria y requerimientos funcionales (RF) y no funcionales (RNF):

* **RF-01**: Autenticación y control de acceso[cite: 1].
* **RF-05**: Registro de actas de partidos[cite: 1].
* **RF-06**: Consulta de tabla de posiciones y estadísticas[cite: 1].
* **RF-07**: Visualización de ubicación de complejos[cite: 1].
* **RNF-03**: Las contraseñas almacenadas en la base de datos deben estar encriptadas utilizando algoritmos de hash seguros (ej. BCrypt)[cite: 1].
* **RNF-08**: El frontend en React debe ser ejecutable y funcional en los navegadores web modernos más utilizados (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge) tanto en escritorio como en dispositivos móviles[cite: 1].

---

## ⚙️ Metodología y Gestión del Proyecto

Para asegurar la calidad y adaptabilidad del desarrollo, implementamos flujos de trabajo profesionales:

* **Scrum y Sprints:** Dividimos el proyecto en iteraciones para entregar módulos funcionales progresivos (Frontend, Validaciones, Carrito)[cite: 1].
* **Trabajo Colaborativo:** Definición clara de roles y reuniones breves de sincronización (Daily Standups) para resolver bloqueos[cite: 1].
* **GitFlow Adaptado:** Implementación de una rama principal `main` para código estable y ramas secundarias por funcionalidad para entregas incrementales[cite: 1].
* **Control de Versiones y Calidad:** Uso de control atómico con la convención *Conventional Commits* (feat, fix, style, docs) y revisiones cruzadas de código (code review) antes de cada integración final[cite: 1].

---

## 👥 División de Roles y Responsabilidades del Equipo

Nos dividimos la arquitectura del proyecto para maximizar nuestra eficiencia:

* **Módulo Frontend & Estructura (HTML5 & CSS3)**: 
  * Maquetación semántica de las 9 vistas del sitio web (index, login, registro, entradas, etc.)[cite: 1].
  * Implementación de hojas de estilo externas (`estilos.css`), modo oscuro y diseño responsive con Bootstrap 5[cite: 1].
* **Módulo de Lógica & Comportamiento (JavaScript)**: 
  * Desarrollo de `validaciones.js` integrando el algoritmo Módulo 11 para RUT chileno, restricción de dominios institucionales/Gmail y validación de edad mínima (+18)[cite: 1].
  * Lógica de interfaz en `carrito.js`, `partidos.js` y `auth.js` utilizando `localStorage`[cite: 1].
* **Módulo de Administración & Documentación**: 
  * Control del repositorio GitHub `090Santander/lif-store` y resolución de conflictos[cite: 1].
  * Redacción del informe técnico, documentación en `README.md` y preparación de la presentación de evaluación[cite: 1].

---

Con el respaldo de un stack tecnológico moderno, este proyecto está preparado para hacer crecer a la Liga Independiente de Fútbol hoy y escalar hacia el futuro[cite: 1].
