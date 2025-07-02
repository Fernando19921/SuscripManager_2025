using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MEGA_PROMOS.Api.PromoXSusc;

namespace MEGA_PROMOS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromoXSuscDatasController : ControllerBase
    {
        private readonly PromoXSuscDbContext _context;

        public PromoXSuscDatasController(PromoXSuscDbContext context)
        {
            _context = context;
        }

        // GET: api/PromoXSuscDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PromoXSuscData>>> Getpromociones_x_suscriptor()
        {
            return await _context.promociones_x_suscriptor.ToListAsync();
        }

        // GET: api/PromoXSuscDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PromoXSuscData>> GetPromoXSuscData(int id)
        {
            var promoXSuscData = await _context.promociones_x_suscriptor.FindAsync(id);

            if (promoXSuscData == null)
            {
                return NotFound();
            }

            return promoXSuscData;
        }

        // PUT: api/PromoXSuscDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromoXSuscData(int id, PromoXSuscData promoXSuscData)
        {
            if (id != promoXSuscData.suscriptor_id)
            {
                return BadRequest();
            }

            _context.Entry(promoXSuscData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PromoXSuscDataExists(id))
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

        // POST: api/PromoXSuscDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PromoXSuscData>> PostPromoXSuscData(PromoXSuscData promoXSuscData)
        {
            _context.promociones_x_suscriptor.Add(promoXSuscData);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PromoXSuscDataExists(promoXSuscData.suscriptor_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPromoXSuscData", new { id = promoXSuscData.suscriptor_id }, promoXSuscData);
        }

        // DELETE: api/PromoXSuscDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromoXSuscData(int id)
        {
            var promoXSuscData = await _context.promociones_x_suscriptor.FindAsync(id);
            if (promoXSuscData == null)
            {
                return NotFound();
            }

            _context.promociones_x_suscriptor.Remove(promoXSuscData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PromoXSuscDataExists(int id)
        {
            return _context.promociones_x_suscriptor.Any(e => e.suscriptor_id == id);
        }
    }
}
