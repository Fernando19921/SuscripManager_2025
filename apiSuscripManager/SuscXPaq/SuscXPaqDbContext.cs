using MEGA_PROMOS.Api.PromoXSusc;
using Microsoft.EntityFrameworkCore;

namespace MEGA_PROMOS.Api.SuscXPaq
{
    public class SuscXPaqDbContext:DbContext
    {
        // Constructor que recibe opciones (como la cadena de conexión) e inicializa la clase base (DbContext)
        public SuscXPaqDbContext(DbContextOptions<SuscXPaqDbContext> options) : base(options)
        {
        }
        public DbSet<SuscXPaqData> suscriptores_x_paquete { get; set; }

        //se tuvo que sobre escribir para que el EF core pueda construir bien el modelo de dato
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SuscXPaqData>()
                .HasKey(p => new { p.suscriptor_id, p.paquete_id, p.fecha_inicio }); // PK compuesta
        }
    }
}
