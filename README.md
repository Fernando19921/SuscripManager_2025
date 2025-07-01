# MEGA-PROMOS.Api

Este proyecto es una API RESTful desarrollada con **.NET Core** y **Entity Framework Core** utilizando enfoque *Database First*. La API permite realizar operaciones CRUD (GET, POST, PUT, DELETE) sobre entidades provenientes de una base de datos relacional.

## Requisitos

- Visual Studio 2022
- .NET 6 o superior
- SQL Server
- Entity Framework Core

## Ejecución del servidor

Para ejecutar el servidor en entorno de desarrollo:

1. Abrir la solución en Visual Studio 2022.
2. Configurar la cadena de conexión en `appsettings.json`.
3. Presionar `F5` o ejecutar desde la terminal.
   
La API se ejecutará en el puerto por defecto.

## Endpoints disponibles
GET /api/[entity] – Obtener todos los registros.

GET /api/[entity]/{id} – Obtener un registro por ID.

POST /api/[entity] – Crear un nuevo registro.

PUT /api/[entity]/{id} – Actualizar un registro existente.

DELETE /api/[entity]/{id} – Eliminar un registro.

GET /api/SuscriptorDatas/reporte-suscriptor/{id}/deuda – Calcular deuda y
detalles de promociones por suscriptor.

## Estructura del proyecto
Controllers/ – Contiene los controladores con la lógica de cada endpoint.

Models/ – Clases generadas desde la base de datos que representan las entidades.

DbContext/ – Clase de contexto que maneja la conexión con la base de datos y el mapeo ORM.

## Base de datos
El modelo fue generado a partir de una base de datos existente utilizando Entity Framework Core.

## Integración con frontend
Esta API está preparada para ser consumida desde una aplicación Angular u otro cliente frontend mediante peticiones HTTP (fetch, HttpClient, etc.).

## Próximos pasos
Implementación de validaciones.

Integración con el frontend Angular.

## notas 
la primera consulta solicitada la cual es solicitar el tipo de promo del suscriptor y mostrar vigencia, y validar si aun esta vigente o ya no.
se encuentra dentro de promocionesDataControler
