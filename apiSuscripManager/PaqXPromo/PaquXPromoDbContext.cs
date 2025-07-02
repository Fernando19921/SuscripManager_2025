using MEGA_PROMOS.Api.ServiciosModel;
using Microsoft.EntityFrameworkCore;

namespace MEGA_PROMOS.Api.PaqXPromo
{
    public class PaquXPromoDbContext:DbContext
    {
        // Constructor que recibe opciones (como la cadena de conexión) e inicializa la clase base (DbContext)
        public PaquXPromoDbContext(DbContextOptions<PaquXPromoDbContext> options) : base(options)
        {
        }

        public DbSet<PaqXPromoData> paquete_x_promocion {  get; set; }

        //se tuvo que sobre escribir para que el EF core pueda construir bien el modelo de dato
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PaqXPromoData>()
                .HasKey(p => new { p.paquete_id, p.promocion_id }); // PK compuesta
        }
    }
}
