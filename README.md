
# ⚽ LIF 2.0 — Liga Independiente de Fútbol

> **Plataforma web dinámica, responsive y escalable** diseñada para centralizar la gestión de torneos deportivos, automatizar procesos administrativos y transformar la experiencia del jugador mediante estadísticas en tiempo real y módulos interactivos[cite: 1].

---

## 📌 Contexto Institucional y Créditos

* **Asignatura:** FULLSTACK II[cite: 1]
* **Docente Supervisor:** Roberto Moreno[cite: 1]
* **Desarrolladores:** Antonia Inostroza & Renato Santander[cite: 1]
* **Organización / Repositorio:** [`090Santander/lif-store`](https://www.google.com/search?q=https://github.com/090Santander/lif-store)[cite: 1]

---

## 🎯 Declaración del Problema y Solución Técnica

### El Problema

La plataforma tradicional de la Liga Independiente de Fútbol (`lif.cl`) presentaba severas limitaciones operativas: procesamiento lento de datos, tablas de posiciones desactualizadas y flujos de trabajo basados en registros físicos en papel (control de tarjetas, planillas de partidos y acreditaciones)[cite: 1]. Esto generaba opacidad informativa y cuellos de botella administrativos[cite: 1].

### La Solución

**LIF 2.0** rearchitectura el ecosistema digital mediante una Single Page Application (SPA) construida en React + TypeScript[cite: 1]. La solución automatiza la compilación de datos de partidos, la venta diferida de entradas con carrito persistente, el control de acceso basado en roles (RBAC) y la visualización interactiva de métricas del torneo en tiempo real[cite: 1].

---

## 📋 Matriz de Requerimientos y Trazabilidad

### Requerimientos Funcionales (RF)

| Código | Módulo | Descripción Técnica | Estado |
| --- | --- | --- | --- |
| **RF-01** | Seguridad | Autenticación de usuarios, gestión de sesiones y protección de rutas administrativas mediante `RutaAdmin`[cite: 1]. | **Implementado** |
| **RF-05** | Competición | Módulo de actas digitales, registro de goles, sanciones y eventos en vivo[cite: 1]. | **Implementado** |
| **RF-06** | Estadísticas | Renderizado dinámico de tablas de posiciones, rendimiento de plantillas y goleadores[cite: 1]. | **Implementado** |
| **RF-07** | Geolocalización | Integración de mapa de sedes y fichas informativas de los complejos deportivos[cite: 1]. | **Implementado** |
| **RF-08** | E-Commerce | Carrito de compras reactivo con persistencia local (`localStorage`) y cálculo de totales[cite: 1]. | **Implementado** |

### Requerimientos No Funcionales (RNF)

| Código | Categoría | Criterio de Aceptación | Estado |
| --- | --- | --- | --- |
| **RNF-03** | Seguridad | Cifrado y procesamiento seguro de credenciales con hashing (BCrypt)[cite: 1]. | **Cumplido** |
| **RNF-08** | Compatibilidad | Interfaz Responsive (Mobile-First) optimizada para Chrome, Firefox, Safari y Edge[cite: 1]. | **Cumplido** |
| **RNF-09** | Calidad / QA | Cobertura de pruebas unitarias superior al 80% global en la suite de componentes y contextos. | **Superado (95.27%)** |

---

## 🛠️ Stack Tecnológico

```text
┌─────────────────────────────────────────────────────────────────┐
│                      CAPA DE PRESENTACIÓN                       │
│       React 18  │  TypeScript 5  │  Vite 5  │  Bootstrap 5       │
└────────────────────────────────┬────────────────────────────────┘
                                 │
┌────────────────────────────────┴────────────────────────────────┐
│                   GESTIÓN DE ESTADO Y LÓGICA                    │
│   Context API (AuthContext, CarritoContext)  │  Web Storage API   │
└────────────────────────────────┬────────────────────────────────┘
                                 │
┌────────────────────────────────┴────────────────────────────────┐
│                      CALIDAD & TESTING SUITE                    │
│   Karma Test Runner  │  Jasmine Framework  │  RTL  │  esbuild   │
└─────────────────────────────────────────────────────────────────┘

```

* **Core Framework:** React 18 (Arquitectura funcional orientada a Hooks).
* **Lenguaje:** TypeScript (Tipado estricto e interfaces desacopladas).
* **Build System & HMR:** Vite + esbuild compiler.
* **UI & Estilos:** CSS3 modular, Bootstrap 5, utilidades responsivas y soporte dinámico de temas (Light/Dark mode)[cite: 1].
* **Validaciones de Dominio:** Módulo 11 para la verificación del RUT chileno, restricción de correo institucional y regla de negocio +18[cite: 1].

---

## 🏗️ Arquitectura de Directorios

```text
lif-store-react/
├── .github/                 # Workflows y plantillas de CI/CD
├── public/                  # Assets estáticos servidos directamente
├── src/
│   ├── assets/              # Identidad visual, logos y multimedia
│   ├── components/          # Componentes presentacionales aislados
│   │   ├── admin/           # Módulos exclusivos de administración
│   │   ├── solicitud/       # Formulario y flujos de inscripción
│   │   └── *.spec.tsx       # Pruebas unitarias asociadas a componentes
│   ├── context/             # Proveedores de estado global de la aplicación
│   │   ├── AuthContext.tsx  # Estado de sesión y tokens
│   │   └── CarritoContext.tsx # Estado reactivo del carrito de compras
│   ├── data/                # Mock data y adaptadores de la capa de datos
│   ├── utils/               # Funciones puras (Módulo 11, formateadores)
│   ├── App.tsx              # Ruteador central y Layout principal
│   └── main.tsx             # Bootstrap de la aplicación React
├── karma.conf.cjs           # Configuración del ejecutor de pruebas Karma
├── tsconfig.json            # Configuración del compilador TypeScript
└── package.json             # Manifiesto de dependencias y scripts

```

---

## 🧪 Control de Calidad y Pruebas Unitarias

La plataforma implementa un entorno de pruebas automatizado basado en **Karma**, **Jasmine** y **React Testing Library** (`@testing-library/react`), garantizando la resiliencia del software ante refactorizaciones.

### Reporte de Cobertura Ejecutado (`npm test`)

```text
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   95.27 |    98.70 |   98.24 |   95.68 |                   
 components/           |  100.00 |    97.14 |  100.00 |  100.00 |                   
 context/              |  100.00 |   100.00 |  100.00 |  100.00 |                   
 utils/                |  100.00 |   100.00 |  100.00 |  100.00 |                   
 data/                 |   72.72 |   100.00 |   90.00 |   76.19 | 19-22, 26
-----------------------|---------|----------|---------|---------|-------------------
TOTAL: 68 SUCCESS | 0 FAILED

```

### Ejecución de Pruebas

```bash
# Lanzar la suite completa de tests en entorno Chrome Headless
npm test

# Modo observación durante el desarrollo
npx karma start karma.conf.cjs --single-run=false

```

---

## 🚀 Guía de Instalación y Despliegue Local

### Prerrequisitos

* **Node.js:** `>= 18.18.0` (LTS recomendado)
* **npm:** `>= 9.0.0`

### Proceso de Despliegue

1. **Clonar el repositorio:**
```bash
git clone https://github.com/090Santander/lif-store.git
cd lif-store/lif-store-react

```


2. **Instalar dependencias del proyecto:**
```bash
npm install

```


3. **Ejecutar en entorno de desarrollo:**
```bash
npm run dev

```


*La aplicación estará disponible en `http://localhost:5173`.*
4. **Compilar artefacto de producción:**
```bash
npm run build

```


*Los archivos optimizados se generarán en la carpeta `dist/`.*

---

## 🔄 Metodología de Desarrollo y Flujo de Trabajo

* **Metodología Ágil:** Ciclos de desarrollo estructurados bajo **Scrum** con iteraciones orientadas a incrementos funcionales de software[cite: 1].
* **Estrategia de Ramificación (GitFlow Adaptado):**
* `main`: Código verificado y listo para despliegue.
* `feature/*`: Ramas de desarrollo para nuevas características.
* `fix/*`: Correcciones de errores y parches de estabilidad.


* **Estándar de Conmutación:** Formato *Conventional Commits* (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`)[cite: 1].

---

## 👥 Matriz de Responsabilidades del Equipo

| Integrante | Rol Principal | Áreas de Contribución |
| --- | --- | --- |
| **Antonia Inostroza** | Frontend Architect & UI Engineer | Diseños responsivos, semántica HTML5, maquetación de vistas, tematización (Dark Mode) e integración con Bootstrap 5[cite: 1]. |
| **Renato Santander** | Lead Software & QA Engineer | Implementación de TypeScript, lógica de estado global (`CarritoContext`), algoritmo Módulo 11, suite de pruebas unitarias en Karma/Jasmine e integración de repositorios[cite: 1]. |

---

## 📄 Licencia

Este proyecto está distribuido bajo la Licencia **MIT**. Consulta el archivo [`LICENSE`](https://www.google.com/search?q=LICENSE) para obtener más información.
