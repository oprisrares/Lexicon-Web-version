using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Gen")]
public class Gen
{
    [Key]
    [Column("Cod_gen")]
    public int CodGen { get; set; }

    [Column("Nume")]
    public string Nume { get; set; }
} 