using MEGA_PROMOS.Api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MEGA_PROMOS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuscriptorDatasController : ControllerBase
    {
        private readonly SuscriptorDbContext _context;

        public SuscriptorDatasController(SuscriptorDbContext context)
        {
            _context = context;
        }

        // GET: api/SuscriptorDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SuscriptorData>>> GetSuscriptor()
        {
            return await _context.Suscriptor.ToListAsync();
        }

        // GET: api/SuscriptorDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SuscriptorData>> GetSuscriptorData(int id)
        {
            var suscriptorData = await _context.Suscriptor.FindAsync(id);

            if (suscriptorData == null)
            {
                return NotFound();
            }

            return suscriptorData;
        }

        // PUT: api/SuscriptorDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSuscriptorData(int id, SuscriptorData suscriptorData)
        {
            if (id != suscriptorData.suscriptor_id)
            {
                return BadRequest();
            }

            _context.Entry(suscriptorData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SuscriptorDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SuscriptorDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SuscriptorData>> PostSuscriptorData(SuscriptorData suscriptorData)
        {
            _context.Suscriptor.Add(suscriptorData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSuscriptorData", new { id = suscriptorData.suscriptor_id }, suscriptorData);
        }

        // DELETE: api/SuscriptorDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSuscriptorData(int id)
        {
            var suscriptorData = await _context.Suscriptor.FindAsync(id);
            if (suscriptorData == null)
            {
                return NotFound();
            }

            _context.Suscriptor.Remove(suscriptorData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SuscriptorDataExists(int id)
        {
            return _context.Suscriptor.Any(e => e.suscriptor_id == id);
        }
        // GET: api/PromocionesDatas/suscriptorInfo
        //Detalle de suscriptores 
        [HttpGet("suscriptorInfo")]//arroja la informacion del suscriptor con detalle 
        public async Task<ActionResult<IEnumerable<object>>> GetPromocionesPorSuscriptor()
        {
            var hoy = DateTime.Today;

            var suscriptores = await _context.Suscriptor.ToListAsync();
            var resultadoSuscriptores = new List<object>();

            foreach (var susc in suscriptores)//recorremos por todos los suscriptores
            {
                var promociones = await (//realizamos los joins de las tablas requeridas para arrojar la info
                    from sp in _context.suscriptores_x_paquete
                    join pxp in _context.paquete_x_promocion on sp.paquete_id equals pxp.paquete_id
                    join promo in _context.promociones on pxp.promocion_id equals promo.promocion_id
                    join p in _context.paquetes on sp.paquete_id equals p.paquete_id
                    where sp.suscriptor_id == susc.suscriptor_id
                          //&& (sp.fecha_terminacion == null || sp.fecha_terminacion >= hoy)
                          && promo.fecha_inicio <= hoy
                    select new
                    {
                        susc.suscriptor_id,
                        susc.nombre,
                        Paquete = p.nombre_paquete,
                        Promocion = promo.nombre,
                        Vigente = hoy <= promo.fecha_fin ? "Vigente" : "Expirada"
                    }
                ).Distinct().ToListAsync();

                if (promociones.Any())
                {
                    resultadoSuscriptores.AddRange(promociones);
                }
            }

            return Ok(resultadoSuscriptores);
        }

        //Reporte de suscriptor
        // GET: api/SuscriptorDatas/reporte-suscriptor/5
        
        [HttpGet("reporte-suscriptor/{suscriptorId}")]//mediante id
        public async Task<ActionResult<IEnumerable<object>>> GetPromocionesPorSuscriptor(int suscriptorId)
        {
            var hoy = DateTime.Today;//ubicamos el dia para las validaciones de la promo c;

            var promociones = await (
                from susc in _context.Suscriptor
                join col in _context.Colonias on susc.colonia_id equals col.colonia_id
                join sp in _context.suscriptores_x_paquete on susc.suscriptor_id equals sp.suscriptor_id
                join pxp in _context.paquete_x_promocion on sp.paquete_id equals pxp.paquete_id
                
                join promo in _context.promociones on pxp.promocion_id equals promo.promocion_id
                join paq in _context.paquetes on sp.paquete_id equals paq.paquete_id
                where sp.suscriptor_id == suscriptorId//validamos la fecha de inicio por la del vigencia
                      && promo.fecha_inicio <= hoy
                      && col.colonia_id == susc.colonia_id
                      && paq.paquete_id == sp.paquete_id
                select new//devuelve el cosntructor, que devuelve(redundantemente) un objeto con la info
                {
                    susc.nombre,
                    susc.correo,
                    Colonia = col.nombre,
                    paq.nombre_paquete,
                    //servicios, tomamos los servicios asignados
                    Servicios = (from pxs in _context.paquete_x_servicios
                                 join s in _context.servicios on pxs.servicio_id equals s.servicio_id
                                 where pxs.paquete_id == paq.paquete_id
                                 select s.nombre_servicio).ToList(),
                    promo.descripcion,
                    Vigente = hoy <= promo.fecha_fin ? "Activa" : "Expirada",// una condicional ternaria para avisarnos si esta expedida o vigente
                    //precio base del paquete
                    paq.precio,
                    //precio con promocion
                    ConDescuento = promo.tipo_descuento == "porcentaje"
                        ? paq.precio - (paq.precio * promo.descuento / 100)
                        : paq.precio - promo.descuento
                }
            ).ToListAsync();//aqui es para asegurarnos que no se repitan las promos

            if (!promociones.Any())//si la lista que se obtiene de la DB tiene algo el .Any devuelve un true y si no, pues lo contrario y arroja el mensaje
            {
                return NotFound(new { mensaje = "No hay promociones vigentes para este suscriptor." });//en caso de no tener promos
            }

            return Ok(promociones);//200!!!
        }

        //calculadora de deuda----
        [HttpGet("reporte-suscriptor/nombre/{nombre}")]
        public async Task<ActionResult<IEnumerable<object>>> GetDeudaPorNombre(string nombre)//el metodo asincrono
        {
            var hoy = DateTime.Today;

            var paquetes = await (//las tablas requeridas de la DB
                from sp in _context.suscriptores_x_paquete
                join susc in _context.Suscriptor on sp.suscriptor_id equals susc.suscriptor_id
                join col in _context.Colonias on susc.colonia_id equals col.colonia_id
                join paq in _context.paquetes on sp.paquete_id equals paq.paquete_id
                join pxp in _context.paquete_x_promocion on paq.paquete_id equals pxp.paquete_id into pxpJoin
                from pxp in pxpJoin.DefaultIfEmpty()
                join promo in _context.promociones on pxp.promocion_id equals promo.promocion_id into promoJoin
                from promo in promoJoin
                    .Where(p => p.fecha_inicio <= hoy && p.fecha_fin >= sp.fecha_inicio) // solo promociones válidas en algún punto del contrato
                    .DefaultIfEmpty()//se requiere para que no truene la consulta
                where susc.nombre.ToLower() == nombre.ToLower()//esto fue para pruebas, igual se conserva en caso de requerirse
                select new//resultado principal de la info a mostrar
                {
                    susc.nombre,
                    Colonia = col.nombre,
                    paq.paquete_id,
                    PaqueteNombre = paq.nombre_paquete,
                    paq.precio,
                    Servicios = (from pxs in _context.paquete_x_servicios//sub consulta de los servicioa
                                 join s in _context.servicios on pxs.servicio_id equals s.servicio_id
                                 where pxs.paquete_id == paq.paquete_id
                                 select s.nombre_servicio).ToList(),
                    Promocion = promo,
                    FechaInicioContrato = sp.fecha_inicio
                }
            ).ToListAsync();

            if (!paquetes.Any())//en caso de no contar con paquetes
                return NotFound(new { mensaje = "No hay paquetes contratados por este suscriptor." });

            var SuscResultados = new List<object>();//objeto del resultado del suscriptor

            foreach (var p in paquetes)
            {
                var mensualidades = new List<object>();

                for (int i = 1; i <= 5; i++)//el calculo lo aplique a 5 meses
                {
                    var fechaMes = p.FechaInicioContrato.AddMonths(i - 1);

                    bool promoVigente = p.Promocion != null &&//checamos la vigencia dependiendo el mes 
                                        fechaMes >= p.Promocion.fecha_inicio &&
                                        fechaMes <= p.Promocion.fecha_fin;

                    var precioConDescuento = promoVigente //sacamos el precio con o sin descuento, segun la respuesta booleana
                        ? (p.Promocion.tipo_descuento == "porcentaje"
                            ? p.precio - (p.precio * p.Promocion.descuento / 100)
                            : p.precio - p.Promocion.descuento)
                        : p.precio;

                    mensualidades.Add(new//resultado por mes
                    {
                        Mes = $"Mes {i} ({fechaMes:MMMM yyyy})",//interpolacion de lista
                        PrecioSinDescuento = p.precio,
                        PrecioAplicado = precioConDescuento,
                        EstadoPromocion = promoVigente ? "Activa" : "Promoción vencida"
                    });
                }

                //retorno final!
                SuscResultados.Add(new
                {
                    p.nombre,
                    p.Colonia,
                    Paquete = p.PaqueteNombre,
                    Servicios = p.Servicios,
                    Promocion = p.Promocion?.nombre ?? "Sin promoción",
                    mensualidades
                });
            }

            return Ok(SuscResultados);
        }
    }
}
