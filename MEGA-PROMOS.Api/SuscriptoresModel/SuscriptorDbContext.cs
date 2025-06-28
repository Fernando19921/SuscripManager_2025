using MEGA_PROMOS.Api.PaquetesModel;
using MEGA_PROMOS.Api.PaqXPromo;
using MEGA_PROMOS.Api.PromocionesModel;
using MEGA_PROMOS.Api.SuscXPaq;
using Microsoft.EntityFrameworkCore;

namespace MEGA_PROMOS.Api.Model
{
    public class SuscriptorDbContext:DbContext
    {
        // Constructor que recibe opciones (como la cadena de conexión) e inicializa la clase base (DbContext)
        public SuscriptorDbContext(DbContextOptions<SuscriptorDbContext> options) : base(options)
        {
        }
        public DbSet<SuscriptorData> Suscriptor { get; set; }
        public DbSet<PromocionesData> promociones { get; set; }
        public DbSet<SuscXPaqData> suscriptores_x_paquete { get; set; }
        public DbSet<PaqXPromoData> paquete_x_promocion { get; set; }
        public DbSet<PaquetesData> paquetes { get; set; }

        //se tuvo que sobre escribir para que el EF core pueda construir bien el modelo de dato - Para evitar el error en la nueva consulta 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PaqXPromoData>()
                .HasKey(p => new { p.paquete_id, p.promocion_id }); // PK compuesta paquete por promocion
            modelBuilder.Entity<SuscXPaqData>()
                .HasKey(p => new { p.suscriptor_id, p.paquete_id, p.fecha_inicio }); // PK compuesta suscriptor por paquete por fecha de inico
        }
    }
}
