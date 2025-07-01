using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MEGA_PROMOS.Api.ColoniasModel
{
    public class Colonias
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int colonia_id {  get; set; }
        public string? nombre { get; set; }
        public string? ciudad { get; set; }
    }
}
