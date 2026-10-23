using System.ComponentModel.DataAnnotations;

namespace DondeDarioMVC.Models;

public class Reserva
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es obligatorio")]
    public string Nombre { get; set; } = "";

    [Required(ErrorMessage = "El correo es obligatorio")]
    [EmailAddress(ErrorMessage = "Escribe un correo válido")]
    public string Correo { get; set; } = "";

    [Required]
    [Range(1, 12, ErrorMessage = "Entre 1 y 12 personas")]
    [Display(Name = "Número de personas")]
    public int NumeroPersonas { get; set; } = 2;

    [Required(ErrorMessage = "La fecha es obligatoria")]
    [DataType(DataType.Date)]
    public DateTime Fecha { get; set; } = DateTime.Today;

    [Required(ErrorMessage = "La hora es obligatoria")]
    [DataType(DataType.Time)]
    public TimeSpan Hora { get; set; } = new TimeSpan(12, 0, 0);

    [Required(ErrorMessage = "Elige un tipo de mesa")]
    [Display(Name = "Tipo de mesa")]
    public string TipoMesa { get; set; } = "";

    public bool Vegetariano { get; set; }

    [Display(Name = "Sin gluten")]
    public bool SinGluten { get; set; }
}