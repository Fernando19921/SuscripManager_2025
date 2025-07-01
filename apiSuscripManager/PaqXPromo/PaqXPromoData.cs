using MEGA_PROMOS.Api.PaquetesModel;
using MEGA_PROMOS.Api.PromocionesModel;

namespace MEGA_PROMOS.Api.PaqXPromo
{
    //ambas son FK por eso se tuvo que crear la PK com puesta
    public class PaqXPromoData
    {
        public int paquete_id { get; set; }
        public int promocion_id { get; set; }
    }
}
