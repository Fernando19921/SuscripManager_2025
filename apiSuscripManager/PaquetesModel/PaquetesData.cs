using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MEGA_PROMOS.Api.PaquetesModel
{
    public class PaquetesData
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int paquete_id { get; set; }
        public string? nombre_paquete { get; set; }
        public string? descripcion { get; set; }
        public decimal precio { get; set; }
    }

}
