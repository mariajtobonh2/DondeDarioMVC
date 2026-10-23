using Microsoft.AspNetCore.Mvc;
using DondeDarioMVC.Models;

namespace DondeDarioMVC.Controllers;

public class ReservasController : Controller
{
    // "Base de datos" en memoria (se vacía al reiniciar la app)
    private static readonly List<Reserva> _reservas = new();

    // GET: /Reservas/Crear  -> muestra el formulario vacío
    [HttpGet]
    public IActionResult Crear()
    {
        return View(new Reserva());
    }

    // POST: /Reservas/Crear -> recibe el formulario y lo procesa
    [HttpPost]
    public IActionResult Crear(Reserva reserva)
    {
        // Reglas del restaurante, procesadas en C#
        if (reserva.Fecha.Date < DateTime.Today)
        {
            ModelState.AddModelError(nameof(reserva.Fecha), "La fecha no puede ser anterior a hoy.");
        }

        if (reserva.Fecha.DayOfWeek == DayOfWeek.Sunday)
        {
            ModelState.AddModelError(nameof(reserva.Fecha), "No atendemos los domingos.");
        }
        else
        {
            var apertura = new TimeSpan(12, 0, 0);
            var cierre = reserva.Fecha.DayOfWeek == DayOfWeek.Saturday
                ? new TimeSpan(16, 0, 0)
                : new TimeSpan(15, 0, 0);

            if (reserva.Hora < apertura || reserva.Hora > cierre)
            {
                ModelState.AddModelError(nameof(reserva.Hora),
                    $"Ese día atendemos de 12:00 a {cierre:hh\\:mm}.");
            }
        }

        // Si algo falló, se vuelve a mostrar el formulario con los errores
        if (!ModelState.IsValid)
        {
            return View(reserva);
        }

        reserva.Id = _reservas.Count + 1;
        _reservas.Add(reserva);

        // Redirige a la confirmación (evita reenviar el formulario al recargar)
        return RedirectToAction(nameof(Confirmacion), new { id = reserva.Id });
    }

    // GET: /Reservas/Confirmacion/1
    public IActionResult Confirmacion(int id)
    {
        var reserva = _reservas.FirstOrDefault(r => r.Id == id);
        if (reserva == null) return NotFound();
        return View(reserva);
    }

    // GET: /Reservas/Listado
    public IActionResult Listado()
    {
        return View(_reservas);
    }
}
