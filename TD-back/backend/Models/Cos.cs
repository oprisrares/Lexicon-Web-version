using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Cos")]
public class Cos
{
    [Key]
    [Column("ID_cos")]
    public int Id { get; set; }

    [Column("Email")]
    public string Email { get; set; }

    [Column("Cod_carte")]
    public int CodCarte { get; set; }
} 