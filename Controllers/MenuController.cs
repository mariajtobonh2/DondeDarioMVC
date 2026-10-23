using Microsoft.AspNetCore.Mvc;
using DondeDarioMVC.Models;

namespace DondeDarioMVC.Controllers;

public class MenuController : Controller
{
    private static readonly List<Plato> _platos = new()
    {
        new Plato { Id = 1, Nombre = "Empanadas colombianas", Categoria = "entradas", Precio = 12000 },
        new Plato { Id = 2, Nombre = "Patacones con hogao",   Categoria = "entradas", Precio = 14000 },
        new Plato { Id = 3, Nombre = "Bandeja paisa",         Categoria = "fuertes",  Precio = 38000 },
        new Plato { Id = 4, Nombre = "Sancocho de gallina",   Categoria = "fuertes",  Precio = 32000 },
        new Plato { Id = 5, Nombre = "Cazuela típica",        Categoria = "fuertes",  Precio = 36000 },
        new Plato { Id = 6, Nombre = "Postre de oreo",        Categoria = "postres",  Precio = 10000 },
        new Plato { Id = 7, Nombre = "Obleas con arequipe",   Categoria = "postres",  Precio = 8000 },
        new Plato { Id = 8, Nombre = "Lulada",                Categoria = "bebidas",  Precio = 7000 },
        new Plato { Id = 9, Nombre = "Jugo de mora",          Categoria = "bebidas",  Precio = 6000 }
    };

    // GET: /Menu  o  /Menu?categoria=fuertes
    public IActionResult Index(string categoria = "todos")
    {
        var lista = categoria == "todos"
            ? _platos
            : _platos.Where(p => p.Categoria == categoria).ToList();

        ViewData["Categoria"] = categoria;
        return View(lista);
    }
}