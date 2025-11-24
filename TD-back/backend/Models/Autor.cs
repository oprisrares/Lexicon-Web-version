using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Autor")]
public class Autor
{
    [Key]
    [Column("Cod_autor")]
    public int CodAutor { get; set; }

    [Column("Nume")]
    public string Nume { get; set; }
} 