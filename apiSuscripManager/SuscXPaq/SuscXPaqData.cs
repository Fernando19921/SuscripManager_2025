namespace MEGA_PROMOS.Api.SuscXPaq
{
    public class SuscXPaqData
    {
        //igual se realizar una PK compuesta para evitar errores
        public int suscriptor_id { get; set; }//FK
        public int paquete_id { get; set; }//FK
        public DateTime fecha_inicio { get; set; }//FK creo o PK
        public DateTime? fecha_terminacion { get; set; }
    }
}
