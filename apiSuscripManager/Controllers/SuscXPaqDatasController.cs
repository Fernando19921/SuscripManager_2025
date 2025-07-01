using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MEGA_PROMOS.Api.SuscXPaq;

namespace MEGA_PROMOS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuscXPaqDatasController : ControllerBase
    {
        private readonly SuscXPaqDbContext _context;

        public SuscXPaqDatasController(SuscXPaqDbContext context)
        {
            _context = context;
        }

        // GET: api/SuscXPaqDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SuscXPaqData>>> Getpromociones_x_suscriptor()
        {
            return await _context.suscriptores_x_paquete.ToListAsync();
        }

        // GET: api/SuscXPaqDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SuscXPaqData>> GetSuscXPaqData(int id)
        {
            var suscXPaqData = await _context.suscriptores_x_paquete.FindAsync(id);

            if (suscXPaqData == null)
            {
                return NotFound();
            }

            return suscXPaqData;
        }

        // PUT: api/SuscXPaqDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSuscXPaqData(int id, SuscXPaqData suscXPaqData)
        {
            if (id != suscXPaqData.suscriptor_id)
            {
                return BadRequest();
            }

            _context.Entry(suscXPaqData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SuscXPaqDataExists(id))
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

        // POST: api/SuscXPaqDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SuscXPaqData>> PostSuscXPaqData(SuscXPaqData suscXPaqData)
        {
            _context.suscriptores_x_paquete.Add(suscXPaqData);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SuscXPaqDataExists(suscXPaqData.suscriptor_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSuscXPaqData", new { id = suscXPaqData.suscriptor_id }, suscXPaqData);
        }

        // DELETE: api/SuscXPaqDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSuscXPaqData(int id)
        {
            var suscXPaqData = await _context.suscriptores_x_paquete.FindAsync(id);
            if (suscXPaqData == null)
            {
                return NotFound();
            }

            _context.suscriptores_x_paquete.Remove(suscXPaqData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SuscXPaqDataExists(int id)
        {
            return _context.suscriptores_x_paquete.Any(e => e.suscriptor_id == id);
        }
    }
}
