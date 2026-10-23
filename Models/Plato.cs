namespace DondeDarioMVC.Models;

public class Plato
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public string Categoria { get; set; } = "";   // entradas | fuertes | postres | bebidas
    public decimal Precio { get; set; }
}