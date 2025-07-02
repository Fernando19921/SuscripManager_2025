using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MEGA_PROMOS.Api.PaqXServ;

namespace MEGA_PROMOS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaqXServDatasController : ControllerBase
    {
        private readonly PaqXServDbContext _context;

        public PaqXServDatasController(PaqXServDbContext context)
        {
            _context = context;
        }

        // GET: api/PaqXServDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaqXServData>>> Getpaquete_x_servicios()
        {
            return await _context.paquete_x_servicios.ToListAsync();
        }

        // GET: api/PaqXServDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaqXServData>> GetPaqXServData(int id)
        {
            var paqXServData = await _context.paquete_x_servicios.FindAsync(id);

            if (paqXServData == null)
            {
                return NotFound();
            }

            return paqXServData;
        }

        // PUT: api/PaqXServDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaqXServData(int id, PaqXServData paqXServData)
        {
            if (id != paqXServData.paquete_id)
            {
                return BadRequest();
            }

            _context.Entry(paqXServData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaqXServDataExists(id))
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

        // POST: api/PaqXServDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaqXServData>> PostPaqXServData(PaqXServData paqXServData)
        {
            _context.paquete_x_servicios.Add(paqXServData);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PaqXServDataExists(paqXServData.paquete_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPaqXServData", new { id = paqXServData.paquete_id }, paqXServData);
        }

        // DELETE: api/PaqXServDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaqXServData(int id)
        {
            var paqXServData = await _context.paquete_x_servicios.FindAsync(id);
            if (paqXServData == null)
            {
                return NotFound();
            }

            _context.paquete_x_servicios.Remove(paqXServData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaqXServDataExists(int id)
        {
            return _context.paquete_x_servicios.Any(e => e.paquete_id == id);
        }
    }
}
