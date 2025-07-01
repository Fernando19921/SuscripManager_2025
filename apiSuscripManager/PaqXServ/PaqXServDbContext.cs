using MEGA_PROMOS.Api.PaqXPromo;
using Microsoft.EntityFrameworkCore;

namespace MEGA_PROMOS.Api.PaqXServ
{
    public class PaqXServDbContext: DbContext
    {
        // Constructor que recibe opciones (como la cadena de conexión) e inicializa la clase base (DbContext)
        public PaqXServDbContext(DbContextOptions<PaqXServDbContext> options) : base(options)
        {
        }

        public DbSet<PaqXServData> paquete_x_servicios { get; set; }

        //se tuvo que sobre escribir para que el EF core pueda construir bien el modelo de dato
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PaqXServData>()
                .HasKey(p => new { p.paquete_id, p.servicio_id }); // PK compuesta
        }
    }
}
