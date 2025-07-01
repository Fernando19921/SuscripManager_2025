using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MEGA_PROMOS.Api.Model
{
    public class SuscriptorData
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int suscriptor_id {  get; set; }
        public string? nombre { get; set; }
        public string? correo { get; set; }
        public int colonia_id { get; set; }

    }
}
