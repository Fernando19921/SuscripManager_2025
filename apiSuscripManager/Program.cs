using MEGA_PROMOS.Api.ColoniasModel;
using MEGA_PROMOS.Api.Model;
using MEGA_PROMOS.Api.PaquetesModel;
using MEGA_PROMOS.Api.PaqXPromo;
using MEGA_PROMOS.Api.PaqXServ;
using MEGA_PROMOS.Api.PromocionesModel;
using MEGA_PROMOS.Api.PromoXSusc;
using MEGA_PROMOS.Api.ServiciosModel;
using MEGA_PROMOS.Api.SuscXPaq;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 👉 Agregar política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
        policy.WithOrigins("http://localhost:53523") // origen de tu frontend
              .AllowAnyHeader()
              .AllowAnyMethod());
});

builder.Services.AddControllers();

// Configuración avanzada de Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "API MEGA_PROMOS",
        Description = "Documentación de la API MEGA_PROMOS con Swagger",
        Contact = new OpenApiContact
        {
            Name = "Equipo de Desarrollo",
            Email = "soporte@megapromos.com",
            Url = new Uri("https://www.megapromos.com")
        }
    });
});

// Configuración de contextos de base de datos
builder.Services.AddDbContext<SuscriptorDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
builder.Services.AddDbContext<ColoniasDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
builder.Services.AddDbContext<PaquetesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
builder.Services.AddDbContext<PromocionesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
builder.Services.AddDbContext<ServiciosDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
builder.Services.AddDbContext<PaqXServDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
builder.Services.AddDbContext<PromoXSuscDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
builder.Services.AddDbContext<SuscXPaqDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
builder.Services.AddDbContext<PaquXPromoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));

var app = builder.Build();

// 👉 Activar CORS antes de cualquier middleware que pueda bloquearlo
app.UseCors("AllowAngularApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MEGA_PROMOS API v1");
        c.RoutePrefix = string.Empty; // Swagger en la raíz
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
