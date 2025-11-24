using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CosController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/cos?email=...
    [HttpGet]
    public async Task<IActionResult> GetFavorite([FromQuery] string email)
    {
        var favorite = await _context.Cosuri
            .Where(c => c.Email == email)
            .Join(_context.Carti, c => c.CodCarte, carte => carte.CodCarte, (c, carte) => new {
                ID_cos = c.Id,
                Cod_carte = c.CodCarte,
                Titlu = carte.Titlu
            })
            .ToListAsync();
        return Ok(favorite);
    }

    // POST: api/cos
    [HttpPost]
    public async Task<IActionResult> AddFavorite([FromBody] Cos model)
    {
        _context.Cosuri.Add(model);
        await _context.SaveChangesAsync();
        return Ok();
    }

    // DELETE: api/cos/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFavorite(int id)
    {
        var entry = await _context.Cosuri.FindAsync(id);
        if (entry == null) return NotFound();
        _context.Cosuri.Remove(entry);
        await _context.SaveChangesAsync();
        return Ok();
    }
} 