using MEGA_PROMOS.Api.Model;
using Microsoft.EntityFrameworkCore;

namespace MEGA_PROMOS.Api.ColoniasModel
{
    public class ColoniasDbContext:DbContext
    {
        // Constructor que recibe opciones (como la cadena de conexión) e inicializa la clase base (DbContext)
        public ColoniasDbContext(DbContextOptions<ColoniasDbContext> options) : base(options)
        {
        }
        public DbSet<Colonias> Colonias {  get; set; }
    }
}
