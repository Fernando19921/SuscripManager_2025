# SuscripManager

## 1. Introducción del Proyecto
**Nombre del proyecto**: **SuscripManager**

Aplicación para gestionar información de suscriptores. Incluye un frontend Angular y una API mínima en .NET para exponer datos de suscriptores y promociones.

**Objetivo**: Proporcionar una plataforma para listar suscriptores, ver detalles y calcular deudas con promociones aplicadas.

**Tecnologías utilizadas**:
- **Frontend**: Angular 18, Angular Material, jsPDF.
- **Backend**: API .NET 9 (Minimal API).
- **Herramientas y librerías**: Node.js, Express (SSR), Karma/Jasmine.

## 2. Instalación y configuración
### Requisitos previos
- Node.js 18 o superior
- .NET 9 SDK
- (Opcional) SQL Server si se agrega persistencia

### Pasos de instalación
1. Clonar el repositorio:
   ```bash
   git clone <repo-url>
   cd SuscripManager_2025
   ```
2. Instalar dependencias de Node:
   ```bash
   npm install
   ```
3. Ejecutar la API desde `apiSuscripManager`:
   ```bash
   cd apiSuscripManager
   dotnet restore
   dotnet run
   ```
4. Iniciar el servidor Angular:
   ```bash
   npm start
   ```

### Variables de entorno
Cree `src/environments/environment.ts` con el siguiente contenido:
```ts
export const environment = { apiUrl: 'http://localhost:5222/api/SuscriptorDatas' };
```
Para producción, `environment.prod.ts` debe apuntar a la URL real del backend.

### Configuración de base de datos
La API es un ejemplo sin persistencia. Si se agrega una base de datos, documente la cadena de conexión en `appsettings.json` y los pasos para migraciones.

## 3. Estructura del proyecto
```
/apiSuscripManager      -> API .NET
/src                    -> Aplicación Angular
  /app                  -> Componentes, servicios y páginas
  /assets               -> Recursos estáticos
/server.ts              -> Servidor Express para SSR
```

## 4. API
Endpoints de ejemplo:
- `GET /api/SuscriptorDatas/suscriptorInfo`
- `GET /api/SuscriptorDatas/reporte-suscriptor/{id}`

Las respuestas se integran en `SuscriptoresService`. Añada descripciones de parámetros y códigos de error una vez definidos.

## 5. Pruebas
- **Unitarias**: `npm test` ejecuta las pruebas con Karma/Jasmine.
- **Integración**: se pueden agregar pruebas para la API usando xUnit u otra herramienta.

## 6. Control de versiones
Se recomienda un flujo sencillo con rama `main` y ramas de características (`feat/`, `fix/`, `docs/`, etc.). Los mensajes de commit deben ser claros.

## 7. Buenas prácticas y convenciones
- Utilizar el formato definido en `.editorconfig`.
- Evitar hardcodear URLs (usar archivos de entorno).
- Elimine TODOs cuando se implementen las funcionalidades.

## 8. Despliegue
- Compilar Angular: `npm run build`.
- Publicar la API: `dotnet publish`.
- Configurar un servidor (IIS, Nginx, etc.) y variables de entorno apuntando a la URL de producción.

## 9. Seguridad
- Validar y sanear entradas en la API.
- Usar HTTPS en producción.
- Considerar autenticación (JWT) si la información es sensible.

## 10. Licencia y créditos
Agregue un archivo `LICENSE` (por ejemplo, MIT) y mencione librerías externas utilizadas.

