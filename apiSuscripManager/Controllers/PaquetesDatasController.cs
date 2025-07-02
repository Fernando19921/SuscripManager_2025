using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MEGA_PROMOS.Api.PaquetesModel;

namespace MEGA_PROMOS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaquetesDatasController : ControllerBase
    {
        private readonly PaquetesDbContext _context;

        public PaquetesDatasController(PaquetesDbContext context)
        {
            _context = context;
        }

        // GET: api/PaquetesDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaquetesData>>> Getpaquetes()
        {
            return await _context.paquetes.ToListAsync();
        }

        // GET: api/PaquetesDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaquetesData>> GetPaquetesData(int id)
        {
            var paquetesData = await _context.paquetes.FindAsync(id);

            if (paquetesData == null)
            {
                return NotFound();
            }

            return paquetesData;
        }

        // PUT: api/PaquetesDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaquetesData(int id, PaquetesData paquetesData)
        {
            if (id != paquetesData.paquete_id)
            {
                return BadRequest();
            }

            _context.Entry(paquetesData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaquetesDataExists(id))
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

        // POST: api/PaquetesDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaquetesData>> PostPaquetesData(PaquetesData paquetesData)
        {
            _context.paquetes.Add(paquetesData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaquetesData", new { id = paquetesData.paquete_id }, paquetesData);
        }

        // DELETE: api/PaquetesDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaquetesData(int id)
        {
            var paquetesData = await _context.paquetes.FindAsync(id);
            if (paquetesData == null)
            {
                return NotFound();
            }

            _context.paquetes.Remove(paquetesData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaquetesDataExists(int id)
        {
            return _context.paquetes.Any(e => e.paquete_id == id);
        }
    }
}
