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

```
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
```

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



# 📄 Documentación del Backend – SuscripManager_2025

## 📚 Índice
1. 🧩 Descripción General
2. ⚙️ Tecnologías Usadas
3. 📁 Estructura del Proyecto Backend
4. 🧱 Modelos de Datos
5. 🧠 DbContext
6. 📡 Endpoints Disponibles
7. 📑 Swagger (Documentación Interactiva)
8. 🏁 Ejecución del Proyecto
9. 📌 Notas Finales

---

## 1. 🧩 Descripción General

El backend de **SuscripManager_2025** está desarrollado en **ASP.NET Core**, utilizando una arquitectura modular basada en controladores (`Controllers`) y modelos (`Models`). Expone una **API RESTful** que permite gestionar promociones, paquetes, suscriptores, mensualidades y sus relaciones. Se utiliza **Entity Framework Core** como ORM para conectar con una base de datos SQL Server.

---

## 2. ⚙️ Tecnologías Usadas

| Tecnología               | Descripción                         |
|--------------------------|-------------------------------------|
| ASP.NET Core Web API     | Framework para construir la API     |
| Entity Framework Core    | ORM para manejo de datos relacional |
| SQL Server               | Base de datos relacional            |
| C#                       | Lenguaje de programación backend    |
| Swagger                  | Documentación y prueba interactiva  |

---

## 3. 📁 Estructura del Proyecto Backend

```
apiSuscripManager/
├── Controllers/
│   ├── PromocionesDatasController.cs
│   ├── PaquetesDatasController.cs
│   ├── SuscriptoresDatasController.cs
│   ├── DeudaController.cs
│   └── ServiciosDatasController.cs
├── Models/
│   ├── PromocionesData.cs
│   ├── PaqXPromoData.cs
│   ├── SuscXPaqData.cs
│   ├── MensualidadData.cs
├── PromocionesDbContext.cs
├── Program.cs
├── appsettings.json
└── MEGA-PROMOS.Api.csproj
```

---

## 4. 🧱 Modelos de Datos

Ejemplo de entidad principal:

```csharp
public class PromocionesData {
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int promocion_id { get; set; }
    public string? nombre { get; set; }
    public string? descripcion { get; set; }
    public decimal descuento { get; set; }
    public string? tipo_descuento { get; set; }
    public DateTime fecha_inicio { get; set; }
    public DateTime fecha_fin { get; set; }
    public bool es_automatica { get; set; }
}
```

También se incluyen entidades de relaciones como `SuscXPaqData`, `PaqXPromoData`, y `MensualidadData`.

---

## 5. 🧠 DbContext

```csharp
public class PromocionesDbContext : DbContext {
    public DbSet<PromocionesData> promociones { get; set; }
    public DbSet<SuscXPaqData> suscriptores_x_paquete { get; set; }
    public DbSet<PaqXPromoData> paquete_x_promocion { get; set; }
    public DbSet<MensualidadData> mensualidades { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<PaqXPromoData>()
            .HasKey(p => new { p.paquete_id, p.promocion_id });

        modelBuilder.Entity<SuscXPaqData>()
            .HasKey(p => new { p.suscriptor_id, p.paquete_id, p.fecha_inicio });
    }
}
```

---

## 6. 📡 Endpoints Disponibles

### 📂 PromocionesDatasController
| Método | Ruta                         | Función                  |
|--------|------------------------------|--------------------------|
| GET    | /api/promociones             | Obtener todas            |
| GET    | /api/promociones/{id}        | Obtener por ID           |
| POST   | /api/promociones             | Crear nueva              |
| PUT    | /api/promociones/{id}        | Actualizar               |
| DELETE | /api/promociones/{id}        | Eliminar                 |

### 📂 SuscriptoresDatasController
| Método | Ruta                  | Función                      |
|--------|-----------------------|------------------------------|
| GET    | /api/suscriptores     | Obtener lista de usuarios    |

### 📂 DeudaController
| Método | Ruta             | Función                       |
|--------|------------------|-------------------------------|
| GET    | /api/deuda/{id}  | Calcular deuda por ID         |

(Otros controladores como Paquetes y Servicios siguen el mismo patrón)

---

## 7. 📑 Swagger (Documentación Interactiva)

### Instalación

```bash
dotnet add package Swashbuckle.AspNetCore
```

### Configuración en Program.cs

```csharp
builder.Services.AddSwaggerGen();
app.UseSwagger();
app.UseSwaggerUI();
```

### Acceso

```
http://localhost:<puerto>/swagger
```

---

## 8. 🏁 Ejecución del Proyecto

### Requisitos

- .NET SDK 6.0 o superior
- SQL Server (local o Docker)
- Visual Studio o VS Code
- Configurar la cadena de conexión en `appsettings.json`

### Comandos

```bash
dotnet build
dotnet run
```

---

## 9. 📌 Notas Finales

- La API cumple con el estándar RESTful.
- El diseño modular permite alta escalabilidad.
- Las relaciones entre suscriptores, paquetes y promociones están bien normalizadas con claves compuestas.
