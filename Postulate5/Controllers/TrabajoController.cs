using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Postulate.Data;
using Postulate.Models;

namespace Postulate.Controllers;

public class TrabajoController : Controller
{
      private readonly ILogger<TrabajoController> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;

    public TrabajoController(ILogger<TrabajoController> logger, ApplicationDbContext context,UserManager<IdentityUser> userManager)
    {
           _logger = logger;
        _context = context;
        _userManager = userManager;
    }

    public IActionResult Index()
    {

        var profesiones = _context.Profesiones.ToList();
        profesiones.Add(new Profesion { ProfesionID = 0, Nombre = "[SELECCIONE...]" });

        ViewBag.ProfesionID = new SelectList(profesiones.OrderBy(c => c.Nombre), "ProfesionID", "Nombre");
        ViewBag.ProfesionBuscarID = new SelectList(profesiones.OrderBy(c => c.Nombre), "ProfesionID", "Nombre");
        var personas = _context.Personas.ToList();
        personas.Add(new Persona { PersonaID = 0, Nombre = "[SELECCIONE...]" });

        ViewBag.PersonaID = new SelectList(personas.OrderBy(c => c.Nombre), "PersonaID", "Nombre");
        ViewBag.BuscarPersonaID = new SelectList(personas.OrderBy(c => c.Nombre), "PersonaID", "Nombre");
        return View("Trabajo");


    }



       public async Task<JsonResult> CardTrabajos(int id, string NombreProfesion)
    {
        var usuarioLogueado = await _userManager.GetUserAsync(HttpContext.User);
        var correoUsuarioLogueado = usuarioLogueado?.Email;

        List<VistaProfesion> tiposProfesionMostrar = new List<VistaProfesion>();

        // Obtener las profesiones de los servicios propuestos por el usuario logueado
        var serviciosPropuestos = _context.Servicios
            .Include(s => s.Profesion)
            .Where(s => s.Persona.Email == correoUsuarioLogueado)
            .Select(s => s.ProfesionID)
            .Distinct()
            .ToList();

        // Filtrar los trabajos basados en las profesiones de los servicios propuestos
        var trabajos = _context.Trabajos
            .Include(t => t.Persona)
            .Include(t => t.Profesion)
            .Where(t => serviciosPropuestos.Contains(t.ProfesionID))
            .ToList();

        // Aplicar filtro adicional por nombre de profesión si se especifica
        if (!string.IsNullOrEmpty(NombreProfesion))
        {
            trabajos = trabajos.Where(s => s.Profesion.Nombre == NombreProfesion).ToList();
        }

        foreach (var trabajo in trabajos)
        {
            var tipoProfesionMostrar = tiposProfesionMostrar.SingleOrDefault(t => t.ProfesionID == trabajo.ProfesionID);
            if (tipoProfesionMostrar == null)
            {
                tipoProfesionMostrar = new VistaProfesion
                {
                    ProfesionID = trabajo.ProfesionID,
                    Nombre = trabajo.Profesion.Nombre,
                    ListadoPersonas = new List<VistaTrabajoPersonas>(),
                };
                tiposProfesionMostrar.Add(tipoProfesionMostrar);
            }

            var VistaTrabajoPersonas = new VistaTrabajoPersonas
            {
                NombrePersona = trabajo.Persona.Nombre,
                ApellidoPersona = trabajo.Persona.Apellido,
                TelefonoPersona = trabajo.Persona.Telefono,
                TrabajoID = trabajo.TrabajoID,
                ImagenID = trabajo.ImagenID,
                PersonaID = trabajo.PersonaID,
                Direccion = trabajo.Direccion,
                Descripcion = trabajo.Descripcion,
                Hora = trabajo.Hora,
                Fecha = trabajo.Fecha,
                Comentario = trabajo.Comentario,
            };

            tipoProfesionMostrar.ListadoPersonas.Add(VistaTrabajoPersonas);
        }

        return Json(tiposProfesionMostrar);
    }

      public JsonResult AgregarTrabajo(int id, int PersonaID, int TrabajoID, int ProfesionID, int? ImagenID, string direccion, string descripcion, DateTime hora, DateTime fecha, int valoracion, string comentario)
    {

        var trabajoExistente = _context.Trabajos.FirstOrDefault(s => s.PersonaID == PersonaID && s.ProfesionID == ProfesionID);

        if (trabajoExistente != null)
        {
            if (TrabajoID == 0 || trabajoExistente.TrabajoID != TrabajoID)
                return Json(new { success = false, message = "La combinación de persona y profesión ya existe." });
        }

        string resultado = "";

        if (TrabajoID == 0)
        {

            var trabajo = new Trabajo
            {

                PersonaID = PersonaID,
                TrabajoID = TrabajoID,
                ProfesionID = ProfesionID,
                ImagenID = ImagenID,
                Direccion = direccion,
                Descripcion = descripcion,
                 Hora = hora,
                 Fecha = fecha,
         

            };

            _context.Add(trabajo);
            _context.SaveChanges();

                        return Json(new { success = true, message = "Trabajo guardado exitosamente." });

    

    }else{
            var trabajoEditar = _context.Trabajos.Where(t => t.TrabajoID == TrabajoID).SingleOrDefault();
            if (trabajoEditar != null)
            {
             

                trabajoEditar.ProfesionID = ProfesionID;
                trabajoEditar.PersonaID = PersonaID;
                trabajoEditar.ImagenID = ImagenID;
                trabajoEditar.Direccion = direccion;
                trabajoEditar.Descripcion = descripcion;
                trabajoEditar.Hora = hora;
                trabajoEditar.Fecha = fecha;
              

                 
            _context.SaveChanges();

            return Json(new { success = true, message = "Trabajo actualizado exitosamente." });
                
            }
    }

        return Json(true);

    }

    
 public JsonResult  EliminarTrabajo (int trabajoID)
 {

      

     var TrabajoEliminar = _context.Trabajos.Find(trabajoID);
    _context.Remove(TrabajoEliminar);
    _context.SaveChanges();
     return Json(true);


   
 }

    

    }

    

