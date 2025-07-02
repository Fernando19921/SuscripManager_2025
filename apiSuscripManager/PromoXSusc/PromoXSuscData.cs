namespace MEGA_PROMOS.Api.PromoXSusc
{
    public class PromoXSuscData
    {
        //igual se realizar una PK compuesta para evitar errores
        public int suscriptor_id { get; set; }//FK
        public int promocion_id { get; set; }//FK
        public DateTime fecha_aplicacion { get; set; }//FK creo o PK
        public bool automatica { get; set; }
    }
}
