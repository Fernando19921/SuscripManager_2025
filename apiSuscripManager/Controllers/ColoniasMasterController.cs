using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MEGA_PROMOS.Api.ColoniasModel;

namespace MEGA_PROMOS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColoniasMasterController : ControllerBase
    {
        private readonly ColoniasDbContext _context;

        public ColoniasMasterController(ColoniasDbContext context)
        {
            _context = context;
        }

        // GET: api/ColoniasMaster
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Colonias>>> GetColonias()
        {
            return await _context.Colonias.ToListAsync();
        }

        // GET: api/ColoniasMaster/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Colonias>> GetColonias(int id)
        {
            var colonias = await _context.Colonias.FindAsync(id);

            if (colonias == null)
            {
                return NotFound();
            }

            return colonias;
        }

        // PUT: api/ColoniasMaster/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColonias(int id, Colonias colonias)
        {
            if (id != colonias.colonia_id)
            {
                return BadRequest();
            }

            _context.Entry(colonias).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColoniasExists(id))
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

        // POST: api/ColoniasMaster
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Colonias>> PostColonias(Colonias colonias)
        {
            _context.Colonias.Add(colonias);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColonias", new { id = colonias.colonia_id }, colonias);
        }

        // DELETE: api/ColoniasMaster/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColonias(int id)
        {
            var colonias = await _context.Colonias.FindAsync(id);
            if (colonias == null)
            {
                return NotFound();
            }

            _context.Colonias.Remove(colonias);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ColoniasExists(int id)
        {
            return _context.Colonias.Any(e => e.colonia_id == id);
        }
    }
}
