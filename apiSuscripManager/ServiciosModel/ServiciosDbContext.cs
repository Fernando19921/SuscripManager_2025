using MEGA_PROMOS.Api.PromocionesModel;
using Microsoft.EntityFrameworkCore;

namespace MEGA_PROMOS.Api.ServiciosModel
{
    public class ServiciosDbContext:DbContext
    {
        // Constructor que recibe opciones (como la cadena de conexión) e inicializa la clase base (DbContext)
        public ServiciosDbContext(DbContextOptions<ServiciosDbContext> options) : base(options)
        {
        }
        public DbSet<ServiciosData>servicios { get; set; }
    }
}
