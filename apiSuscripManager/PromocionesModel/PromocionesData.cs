using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MEGA_PROMOS.Api.PromocionesModel
{
    public class PromocionesData
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int promocion_id { get; set; }
        public string? nombre { get; set; }
        public string? descripcion { get; set; }
        public decimal descuento { get; set; }
        public string? tipo_descuento { get; set; }
        public DateTime fecha_inicio { get; set; }
        public DateTime fecha_fin { get; set; }
        public bool es_automatica { get; set; }
    }
}
