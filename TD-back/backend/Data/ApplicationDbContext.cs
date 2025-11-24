using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Carte> Carti { get; set; }
    public DbSet<Gen> Genuri { get; set; }
    public DbSet<Cos> Cosuri { get; set; }
    public DbSet<Autor> Autori { get; set; }
} 