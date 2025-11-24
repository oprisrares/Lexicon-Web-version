using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Cont")]
public class User
{
    [Key]
    [Column("Cod_cont")]
    public int CodCont { get; set; }

    [Required]
    [Column("Email")]
    [StringLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Column("Parola")]
    [StringLength(100)]
    public string Parola { get; set; } = string.Empty;
} 