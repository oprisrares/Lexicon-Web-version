using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Carte")]
public class Carte
{
    [Key]
    [Column("Cod_carte")]
    public int CodCarte { get; set; }

    [Column("Titlu")]
    public string Titlu { get; set; }

    [Column("Descriere")]
    public string Descriere { get; set; }

    [Column("Recenzie")]
    public string Recenzie { get; set; }

    [Column("Poza")]
    public string Poza { get; set; }

    [Column("Pdf")]
    public string Pdf { get; set; }

    [Column("Cod_autor")]
    public int CodAutor { get; set; }
} 