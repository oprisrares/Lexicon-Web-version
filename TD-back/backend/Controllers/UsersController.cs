using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    [HttpGet("{codCont}")]
    public async Task<ActionResult<User>> GetUser(int codCont)
    {
        var user = await _context.Users.FindAsync(codCont);
        if (user == null)
        {
            return NotFound();
        }
        return user;
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        // Setează CodCont manual
        int maxCodCont = 0;
        if (_context.Users.Any())
        {
            maxCodCont = _context.Users.Max(u => u.CodCont);
        }
        user.CodCont = maxCodCont + 1;

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { codCont = user.CodCont }, user);
    }

    [HttpPut("{codCont}")]
    public async Task<IActionResult> UpdateUser(int codCont, User user)
    {
        if (codCont != user.CodCont)
        {
            return BadRequest();
        }

        _context.Entry(user).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(codCont))
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

    [HttpDelete("{codCont}")]
    public async Task<IActionResult> DeleteUser(int codCont)
    {
        var user = await _context.Users.FindAsync(codCont);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto login)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login.Email);
        if (user == null || user.Parola != login.Parola)
        {
            return Unauthorized(new { message = "Email sau parolă incorectă!" });
        }
        return Ok(new { message = "Autentificare reușită!" });
    }

    [HttpPut("changepassword")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return NotFound(new { message = "Utilizatorul nu a fost găsit!" });

        user.Parola = dto.NewPassword;
        await _context.SaveChangesAsync();
        return Ok(new { message = "Parola a fost schimbată cu succes!" });
    }

    public class UserLoginDto
    {
        public string? Email { get; set; }
        public string? Parola { get; set; }
    }

    public class ChangePasswordDto
    {
        public string? Email { get; set; }
        public string? NewPassword { get; set; }
    }

    private bool UserExists(int codCont)
    {
        return _context.Users.Any(e => e.CodCont == codCont);
    }
} 