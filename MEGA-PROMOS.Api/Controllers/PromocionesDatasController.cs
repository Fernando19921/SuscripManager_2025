using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MEGA_PROMOS.Api.PromocionesModel;

namespace MEGA_PROMOS.Api.Controllers
    //no documento detallamadamente ya que  se genera gracias a la herramienta de vs 2022, cualquier duda me dicen
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromocionesDatasController : ControllerBase
    {
        private readonly PromocionesDbContext _context;

        public PromocionesDatasController(PromocionesDbContext context)
        {
            _context = context;
        }

        // GET: api/PromocionesDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PromocionesData>>> Getpromociones()
        {
            return await _context.promociones.ToListAsync();
        }

        // GET: api/PromocionesDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PromocionesData>> GetPromocionesData(int id)
        {
            var promocionesData = await _context.promociones.FindAsync(id);

            if (promocionesData == null)
            {
                return NotFound();
            }

            return promocionesData;
        }

        // PUT: api/PromocionesDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromocionesData(int id, PromocionesData promocionesData)
        {
            if (id != promocionesData.promocion_id)
            {
                return BadRequest();
            }

            _context.Entry(promocionesData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PromocionesDataExists(id))
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

        // POST: api/PromocionesDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PromocionesData>> PostPromocionesData(PromocionesData promocionesData)
        {
            _context.promociones.Add(promocionesData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPromocionesData", new { id = promocionesData.promocion_id }, promocionesData);
        }

        // DELETE: api/PromocionesDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromocionesData(int id)
        {
            var promocionesData = await _context.promociones.FindAsync(id);
            if (promocionesData == null)
            {
                return NotFound();
            }

            _context.promociones.Remove(promocionesData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PromocionesDataExists(int id)
        {
            return _context.promociones.Any(e => e.promocion_id == id);
        }
        // GET: api/PromocionesDatas/por-suscriptor/5
        //documentado mas detallado ya que aqui se implementa la logica del primer requerimiento jira
        [HttpGet("por-suscriptor/{suscriptorId}")]//decorador igua se modifica por uno que se les haga mas sensillo identificar ya que lo meti en en promos como pueden ver
        public async Task<ActionResult<IEnumerable<object>>> GetPromocionesPorSuscriptor(int suscriptorId)
        {
            var hoy = DateTime.Today;//ubicamos el dia para las validaciones de la promo c;

            var promociones = await (
                from sp in _context.suscriptores_x_paquete
                join pxp in _context.paquete_x_promocion on sp.paquete_id equals pxp.paquete_id
                join promo in _context.promociones on pxp.promocion_id equals promo.promocion_id
                where sp.suscriptor_id == suscriptorId//validamos la fecha de inicio por la del vigencia
                      && promo.fecha_inicio <= hoy
                      && promo.fecha_fin >= hoy
                select new//devuelve el cosntructor, que devuelve(redundantemente) un objeto con la info
                {
                    promo.nombre,
                    promo.descripcion,
                    promo.tipo_descuento,
                    FechaExpiracion = promo.fecha_fin,
                    Vigente = hoy <= promo.fecha_fin ? "Vigente" : "Expirada"// una condicional ternaria para avisarnos si esta expedida o vigente
                }
            ).Distinct().ToListAsync();//aqui es para asegurarnos que no se repitan las promos

            if (!promociones.Any())//si la lista que se obtiene de la DB tiene algo el .Any devuelve un true y si no, pues lo contrario y arroja el mensaje
            {
                return NotFound(new { mensaje = "No hay promociones vigentes para este suscriptor." });//en caso de no tener promos
            }

            return Ok(promociones);//200!!!
        }
    }
}
