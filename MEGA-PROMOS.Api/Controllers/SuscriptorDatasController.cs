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
        [HttpGet("suscriptorInfo")]
        public async Task<ActionResult<IEnumerable<object>>> GetPromocionesPorSuscriptor()
        {
            var hoy = DateTime.Today;

            var suscriptores = await _context.Suscriptor.ToListAsync();
            var resultadoSuscriptores = new List<object>();

            foreach (var susc in suscriptores)
            {
                var promociones = await (
                    from sp in _context.suscriptores_x_paquete
                    join pxp in _context.paquete_x_promocion on sp.paquete_id equals pxp.paquete_id
                    join promo in _context.promociones on pxp.promocion_id equals promo.promocion_id
                    join p in _context.paquetes on sp.paquete_id equals p.paquete_id
                    where sp.suscriptor_id == susc.suscriptor_id
                          //&& (sp.fecha_terminacion == null || sp.fecha_terminacion >= hoy)
                          && promo.fecha_inicio <= hoy
                          //&& promo.fecha_fin >= hoy
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

    }
}
