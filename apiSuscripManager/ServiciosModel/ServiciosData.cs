using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MEGA_PROMOS.Api.ServiciosModel
{
    public class ServiciosData
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int servicio_id { get; set; }
        public string? nombre_servicio { get; set; }
    }
}
