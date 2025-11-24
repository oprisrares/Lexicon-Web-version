using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartiController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CartiController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CarteDTO>>> GetCarti()
    {
        var carti = await _context.Carti.ToListAsync();
        var cartiDto = carti.Select(c => new CarteDTO
        {
            CodCarte = c.CodCarte,
            Titlu = c.Titlu,
            Descriere = c.Descriere,
            Recenzie = c.Recenzie,
            Poza = (c.Poza != null && (c.Poza.StartsWith("http://") || c.Poza.StartsWith("https://"))) ? "default.jpg" : c.Poza,
            Pdf = c.Pdf
        }).ToList();
        return cartiDto;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CarteDTO>> GetCarte(int id)
    {
        var carte = await _context.Carti.FindAsync(id);
        if (carte == null)
            return NotFound();
        var carteDto = new CarteDTO
        {
            CodCarte = carte.CodCarte,
            Titlu = carte.Titlu,
            Descriere = carte.Descriere,
            Recenzie = carte.Recenzie,
            Poza = (carte.Poza != null && (carte.Poza.StartsWith("http://") || carte.Poza.StartsWith("https://"))) ? "default.jpg" : carte.Poza,
            Pdf = carte.Pdf
        };
        return carteDto;
    }

    [HttpGet("/api/genuri")]
    public async Task<ActionResult<IEnumerable<string>>> GetGenuri()
    {
        var genuri = await _context.Genuri.Select(g => g.Nume).ToListAsync();
        return Ok(genuri);
    }
} 