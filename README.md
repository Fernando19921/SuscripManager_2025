# 📘 Documentación Técnica Avanzada - Frontend `SuscripManager`

## 🧠 Índice

1. [🎯 Descripción General](#descripción-general)  
2. [🚀 Tecnologías y Dependencias](#tecnologías-y-dependencias)  
3. [🏗️ Estructura del Proyecto](#estructura-del-proyecto)  
4. [⚙️ Configuración e Instalación](#configuración-e-instalación)  
5. [🔌 Integración con API](#integración-con-api)  
6. [🌐 Navegación y Rutas](#navegación-y-rutas)  
7. [🧩 Componentes y Páginas Clave](#componentes-y-páginas-clave)  
8. [🎨 Estilos y Diseño UI/UX](#estilos-y-diseño-uiux)  
9. [🧼 Buenas Prácticas de Código](#buenas-prácticas-de-código)  
10. [📌 Futuras Implementaciones](#futuras-implementaciones)  

---

## 1. Descripción General

SuscripManager es una aplicación desarrollada en Angular destinada a la administración de suscriptores. Permite ver información detallada de cada suscriptor, su historial de deuda y su información general. Está conectada a una API REST desarrollada en .NET.

---

## 2. Tecnologías y Dependencias

- **Framework:** Angular
- **Lenguaje:** TypeScript
- **Manejo de estado:** RxJS / Observables
- **Estilos:** CSS puro (sin preprocesadores, pero compatible)
- **Herramientas:** Angular CLI, Angular Router, HttpClient
- **Conexión Backend:** API RESTful en .NET

---

## 3. Estructura del Proyecto

\`\`\`
src/
├── app/
│   ├── core/                  # Componentes compartidos y servicios
│   │   ├── footer/            # Footer global
│   │   ├── side-bar/          # Sidebar navegacional
│   │   ├── loading-spinner/   # Indicador de carga
│   │   └── services/          # Servicios HTTP
│   ├── pages/                 # Vistas principales
│   │   ├── detalle-suscriptor/
│   │   ├── deuda-suscriptor/
│   │   └── inf-suscriptor/
│   ├── suscriptor/            # Interfaces y componentes reutilizables
│   ├── app.routes.ts          # Definición de rutas
├── assets/                    # Recursos estáticos
├── styles.css                 # Estilos globales
└── index.html                 # Entrada de la aplicación
\`\`\`

---

## 4. Configuración e Instalación

### Requisitos Previos
- Node.js v16+
- Angular CLI instalado globalmente

### Instrucciones
```bash
npm install         # Instala dependencias
ng serve            # Levanta el servidor en desarrollo
```

Luego accede en tu navegador a `http://localhost:4200/`.

---

## 5. Integración con API

La comunicación con el backend se realiza desde `core/services`.

### Ejemplo de servicio:
```ts
getSuscriptores(): Observable<Suscriptor[]> {
  return this.http.get<Suscriptor[]>(`${this.apiUrl}/suscriptores`);
}
```

- Las interfaces se ubican en: `suscriptor/interface/`
- La API requiere rutas como: `/detalle/:id`, `/deuda/:id`, `/info/:id`

---

## 6. Navegación y Rutas

Las rutas están definidas en `app.routes.ts` usando `RouterModule`.

| Ruta Angular         | Componente Angular             | Descripción                          |
|----------------------|--------------------------------|--------------------------------------|
| `/detalle/:id`       | DetalleSuscriptorComponent     | Vista de datos personales            |
| `/deuda/:id`         | DeudaSuscriptorComponent       | Vista de deudas                      |
| `/info/:id`          | InfSuscriptorComponent         | Vista general del suscriptor         |

---

## 7. Componentes y Páginas Clave

### 🔹 Componentes Reutilizables
- **SidebarComponent** – Navegación lateral adaptable.
- **FooterComponent** – Pie de página común.
- **LoadingSpinnerComponent** – Indicador de carga con suscripción al estado.

###  Páginas Principales
- **DetalleSuscriptorComponent** – Muestra nombre, edad, dirección, etc.
- **DeudaSuscriptorComponent** – Lista las deudas pendientes del suscriptor.
- **InfSuscriptorComponent** – Muestra información resumida y estado.

---

## 8.  Estilos y Diseño UI/UX

- CSS centralizado en `styles.css`.
- Componentes estructurados con principios de diseño responsivo.
- Paleta de colores sobria y accesible (editable fácilmente).
- Ideal para futura integración con Bootstrap o Tailwind.

---

## 9.  Buenas Prácticas de Código

- **Separación de responsabilidades:** servicios, interfaces y vistas separados.
- **Uso de `BehaviorSubject` y `Observable`** para manejo reactivo del estado.
- **Componentes desacoplados y reutilizables.**
- **Código documentado y tipado estrictamente con TypeScript.**

---

## 10.  Futuras Implementaciones

- ✅ Manejo global de errores HTTP.
- ✅ Sistema de login y guardas de ruta (`AuthGuard`).
- ✅ Módulo de administración para CRUD de suscriptores.
- ✅ Testing automatizado con Jasmine y Karma.
- ✅ Soporte para modo oscuro.

---

📍 Para dudas, sugerencias o colaboración técnica, contacta al equipo de desarrollo o revisa el repositorio completo.

