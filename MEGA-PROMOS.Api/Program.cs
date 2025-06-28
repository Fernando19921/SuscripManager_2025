

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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//puente a suscriptor
builder.Services.AddDbContext<SuscriptorDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
//puente a colonias
builder.Services.AddDbContext<ColoniasDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
//puente a paquetes
builder.Services.AddDbContext<PaquetesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
//puente a proimociones
builder.Services.AddDbContext<PromocionesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
//puente a proimociones
builder.Services.AddDbContext<ServiciosDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
//puente a paquete x servicio
builder.Services.AddDbContext<PaqXServDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
//puente a promocion x suscriptos
builder.Services.AddDbContext<PromoXSuscDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
//puente a suscriptores x paquete
builder.Services.AddDbContext<SuscXPaqDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));
//puente a suscriptores x paquete
builder.Services.AddDbContext<PaquXPromoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MegaCon")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
