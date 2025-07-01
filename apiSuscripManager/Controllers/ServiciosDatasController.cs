using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MEGA_PROMOS.Api.ServiciosModel;

namespace MEGA_PROMOS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiciosDatasController : ControllerBase
    {
        private readonly ServiciosDbContext _context;

        public ServiciosDatasController(ServiciosDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiciosDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiciosData>>> Getservicios()
        {
            return await _context.servicios.ToListAsync();
        }

        // GET: api/ServiciosDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiciosData>> GetServiciosData(int id)
        {
            var serviciosData = await _context.servicios.FindAsync(id);

            if (serviciosData == null)
            {
                return NotFound();
            }

            return serviciosData;
        }

        // PUT: api/ServiciosDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiciosData(int id, ServiciosData serviciosData)
        {
            if (id != serviciosData.servicio_id)
            {
                return BadRequest();
            }

            _context.Entry(serviciosData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiciosDataExists(id))
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

        // POST: api/ServiciosDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServiciosData>> PostServiciosData(ServiciosData serviciosData)
        {
            _context.servicios.Add(serviciosData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiciosData", new { id = serviciosData.servicio_id }, serviciosData);
        }

        // DELETE: api/ServiciosDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiciosData(int id)
        {
            var serviciosData = await _context.servicios.FindAsync(id);
            if (serviciosData == null)
            {
                return NotFound();
            }

            _context.servicios.Remove(serviciosData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiciosDataExists(int id)
        {
            return _context.servicios.Any(e => e.servicio_id == id);
        }
    }
}
