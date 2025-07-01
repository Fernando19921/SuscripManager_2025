using MEGA_PROMOS.Api.ColoniasModel;
using Microsoft.EntityFrameworkCore;

namespace MEGA_PROMOS.Api.PaquetesModel
{
    public class PaquetesDbContext:DbContext
    {
        // Constructor que recibe opciones (como la cadena de conexión) e inicializa la clase base (DbContext)
        public PaquetesDbContext(DbContextOptions<PaquetesDbContext> options) : base(options)
        {
        }
        public DbSet<PaquetesData>paquetes { get; set; }
    }
}
