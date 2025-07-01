using MEGA_PROMOS.Api.PaqXServ;
using Microsoft.EntityFrameworkCore;

namespace MEGA_PROMOS.Api.PromoXSusc
{
    public class PromoXSuscDbContext:DbContext
    {
        // Constructor que recibe opciones (como la cadena de conexión) e inicializa la clase base (DbContext)
        public PromoXSuscDbContext(DbContextOptions<PromoXSuscDbContext> options) : base(options)
        {
        }

        public DbSet<PromoXSuscData> promociones_x_suscriptor {  get; set; }

        //se tuvo que sobre escribir para que el EF core pueda construir bien el modelo de dato
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PromoXSuscData>()
                .HasKey(p => new { p.suscriptor_id, p.promocion_id, p.fecha_aplicacion }); // PK compuesta
        }
    }
}
