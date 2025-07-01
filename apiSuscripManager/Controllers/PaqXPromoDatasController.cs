using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MEGA_PROMOS.Api.PaqXPromo;

namespace MEGA_PROMOS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaqXPromoDatasController : ControllerBase
    {
        private readonly PaquXPromoDbContext _context;

        public PaqXPromoDatasController(PaquXPromoDbContext context)
        {
            _context = context;
        }

        // GET: api/PaqXPromoDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaqXPromoData>>> Getpaquete_x_promocion()
        {
            return await _context.paquete_x_promocion.ToListAsync();
        }

        // GET: api/PaqXPromoDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaqXPromoData>> GetPaqXPromoData(int id)
        {
            var paqXPromoData = await _context.paquete_x_promocion.FindAsync(id);

            if (paqXPromoData == null)
            {
                return NotFound();
            }

            return paqXPromoData;
        }

        // PUT: api/PaqXPromoDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaqXPromoData(int id, PaqXPromoData paqXPromoData)
        {
            if (id != paqXPromoData.paquete_id)
            {
                return BadRequest();
            }

            _context.Entry(paqXPromoData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaqXPromoDataExists(id))
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

        // POST: api/PaqXPromoDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaqXPromoData>> PostPaqXPromoData(PaqXPromoData paqXPromoData)
        {
            _context.paquete_x_promocion.Add(paqXPromoData);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PaqXPromoDataExists(paqXPromoData.paquete_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPaqXPromoData", new { id = paqXPromoData.paquete_id }, paqXPromoData);
        }

        // DELETE: api/PaqXPromoDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaqXPromoData(int id)
        {
            var paqXPromoData = await _context.paquete_x_promocion.FindAsync(id);
            if (paqXPromoData == null)
            {
                return NotFound();
            }

            _context.paquete_x_promocion.Remove(paqXPromoData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaqXPromoDataExists(int id)
        {
            return _context.paquete_x_promocion.Any(e => e.paquete_id == id);
        }
    }
}
