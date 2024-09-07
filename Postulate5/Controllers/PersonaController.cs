using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Postulate.Data;
using Postulate.Models;

namespace Postulate.Controllers;

public class PersonaController : Controller
{
    private readonly ILogger<PersonaController> _logger;

        private readonly ApplicationDbContext _context;
            private readonly UserManager<IdentityUser> _userManager; // obtener correo

    public PersonaController(ILogger<PersonaController> logger,ApplicationDbContext context,UserManager<IdentityUser> userManager)
    {
        _logger = logger;
        _context = context;

         _userManager = userManager; //tiene que ver con el correo
    }



    public IActionResult Index()
    {     // Obtener el correo del usuario logueado

         var usuarioLogueado = _userManager.GetUserAsync(HttpContext.User).Result;
    var correoUsuarioLogueado = usuarioLogueado?.Email;



       // Buscar la persona con el correo del usuario logueado
    var persona = _context.Personas.FirstOrDefault(p => p.Email == correoUsuarioLogueado);

    // Obtener el nombre de la persona
    var nombrePersona = persona?.Nombre ?? "Desconocido";

    // Pasar el nombre a ViewBag
    ViewBag.NombrePersona = nombrePersona;



        // Cargar provincias de la base de datos
        var provincias = _context.Provincias.ToList();
        var provinciasBuscar = provincias.ToList();

        // Agregar opciones de selección predeterminadas
        provincias.Add(new Provincia { ProvinciaID = 0, Nombre = "[SELECCIONE...]" });
        provinciasBuscar.Add(new Provincia { ProvinciaID = 0, Nombre = "[TODAS LAS PROVINCIAS]" });

        // Asignar las listas de selección al ViewBag con las claves correctas
        ViewBag.ProvinciaID = new SelectList(provincias.OrderBy(c => c.Nombre), "ProvinciaID", "Nombre");
        ViewBag.ProvinciaBuscarID = new SelectList(provinciasBuscar.OrderBy(c => c.Nombre), "ProvinciaID", "Nombre");

        // Cargar localidades de la base de datos
        var localidades = _context.Localidades.ToList();
        var localidadesBuscar = localidades.ToList();

        // Agregar opciones de selección predeterminadas
        localidades.Add(new Localidad { LocalidadID = 0, Nombre = "[SELECCIONE...]" });
        localidadesBuscar.Add(new Localidad { LocalidadID = 0, Nombre = "[TODAS LAS LOCALIDADES]" });

        // Asignar las listas de selección al ViewBag con las claves correctas
        ViewBag.LocalidadID = new SelectList(localidades.OrderBy(c => c.Nombre), "LocalidadID", "Nombre");
        ViewBag.LocalidadBuscarID = new SelectList(localidadesBuscar.OrderBy(c => c.Nombre), "LocalidadID", "Nombre");


         // Pasar el correo del usuario logueado a la vista
          ViewBag.CorreoUsuarioLogueado = correoUsuarioLogueado;

        // Retornar la vista "Persona" con los datos cargados en ViewBag
        return View("Persona");

    }

    // public ActionResult TraerDatosPersonal( int  Id, string? nombre, string? apellido, int edad, int telefono,int correo)

    // {

    //     List <VistaTraerDatosPersonal> TraerDatosPersonal = new List<VistaTraerDatosPersonal>();
    //     var personas = _context.Personas.ToList();

    //     if (Id != null)
    //     {
    //         personas = personas.Where(a => a.PersonaID == Id).ToList();
    //     }

    //     foreach (var persona in personas)
    // {
    //     var datosPersona = new VistaTraerDatosPersonal
    //     {
    //         PersonaID = persona.PersonaID,
    //           LocalidadID = persona.LocalidadID,
    //         Nombre = persona.Nombre,
    //         Apellido = persona.Apellido,
    //         Edad = persona.Edad,
    //         Telefono = persona.Telefono,
    //         Email = persona.Email
    //     };

    //     TraerDatosPersonal.Add(datosPersona);
    // }

    // return Json(TraerDatosPersonal);

    // }



// en guardar se guardar los datos del formulario de ingreso de la persona 
[HttpPost]
public ActionResult Guardar(int localidadId, int? personaID, string nombre, string apellido, int edad, int telefono, int documento, string? correo)
{
    string resultado = "Error al guardar el formulario";

    // Puedes obtener el correo del usuario logueado aquí también si es necesario
    var usuarioLogueado = _userManager.GetUserAsync(HttpContext.User).Result;
    var correoUsuarioLogueado = usuarioLogueado?.Email;

    // Validar que el correo del formulario sea el mismo que el del usuario logueado
    if (correo != correoUsuarioLogueado)
    {
        resultado = "El correo debe coincidir con el correo del usuario logueado.";
        return Json(resultado);
    }

    if (personaID == 0 || !personaID.HasValue)
    {
        var existeFormulario = _context.Personas.Any(p => p.PersonaID == personaID);
        if (!existeFormulario)
        {
            var Nuevousuario = new Persona
            {
                LocalidadID = localidadId,
                Nombre = nombre,
                Apellido = apellido,
                Edad = edad,
                Telefono = telefono,
                Documento = documento,
                Email = correo
            };
            _context.Personas.Add(Nuevousuario);
            _context.SaveChanges();
            resultado = "Usuario guardado correctamente";
        }
        else
        {
            resultado = "El formulario ya existe";
        }
    }
    else
    {
        var personaEditar = _context.Personas.Where(e => e.PersonaID == personaID).SingleOrDefault();
        if (personaEditar != null)
        {
            var existePersona = _context.Personas.Where(p => p.Nombre == nombre && p.PersonaID != personaID).Count();
            if (existePersona == 0)
            {
                personaEditar.LocalidadID = localidadId;
                personaEditar.Nombre = nombre;
                personaEditar.Apellido = apellido;
                personaEditar.Edad = edad;
                personaEditar.Telefono = telefono;
                personaEditar.Documento = documento;

                _context.SaveChanges();
                resultado = "Usuario actualizado correctamente";
            }
            else
            {
                resultado = "Ya existe otra persona con el mismo nombre.";
            }
        }
    }

    return Json(resultado);
}


// en esta vista se recupera los datos para crear el listado y luego poder editarlos

public IActionResult VistaPersona()
        {
             // Cargar localidades de la base de datos
        var localidades = _context.Localidades.ToList();
        var localidadesBuscar = localidades.ToList();

        // Agregar opciones de selección predeterminadas
        localidades.Add(new Localidad { LocalidadID = 0, Nombre = "[SELECCIONE...]" });
        localidadesBuscar.Add(new Localidad { LocalidadID = 0, Nombre = "[TODAS LAS LOCALIDADES]" });

        // Asignar las listas de selección al ViewBag con las claves correctas
        ViewBag.LocalidadID = new SelectList(localidades.OrderBy(c => c.Nombre), "LocalidadID", "Nombre");
        ViewBag.LocalidadBuscarID = new SelectList(localidadesBuscar.OrderBy(c => c.Nombre), "LocalidadID", "Nombre");

             return View("VistaPersona");



        }

// recuperar perfil es para recuperar los datos y posterior mente editarlos en GuardarPerfil
    public JsonResult RecuperarPerfilPersona(int id)
{
    var personas = _context.Personas
        .Include(p => p.Localidad)
        .ToList();

    if (id > 0)
    {
        personas = personas.Where(p => p.PersonaID == id).ToList();
    }

    var personaMostrar = personas.Select(p => new VistaTraerDatosPersonal
    {
        PersonaID = p.PersonaID,
        NombreLocalidad = p.Localidad.Nombre,
        Nombre = p.Nombre,
        Apellido = p.Apellido,
        Telefono = p.Telefono,
        Edad = p.Edad,
        Documento = p.Documento,
        Email = p.Email,
    }).ToList();

    return Json(personaMostrar);
}


// en GuardarPerfil en esta vista esta elaborado para editar desde la vista persona

public ActionResult GuardarPerfil(int localidadId, int? personaID, string nombre, string apellido, int edad, int telefono, int documento, string? correo)
{
    string resultado = "Error al guardar el formulario";

    if (personaID == 0 || !personaID.HasValue)
    {
        var Nuevousuario = new Persona
        {
            LocalidadID = localidadId,
            Nombre = nombre,
            Apellido = apellido,
            Edad = edad,
            Telefono = telefono,
            Documento = documento,
            Email = correo
        };
        _context.Personas.Add(Nuevousuario);
        _context.SaveChanges();
        resultado = "Usuario guardado correctamente";
    }
    else
    {
        var personaEditar = _context.Personas.Where(e => e.PersonaID == personaID).SingleOrDefault();
        if (personaEditar != null)
        {
            // personaEditar.LocalidadID = localidadId;
            personaEditar.Nombre = nombre;
            personaEditar.Apellido = apellido;
            personaEditar.Edad = edad;
            personaEditar.Telefono = telefono;
            personaEditar.Documento = documento;

            _context.SaveChanges();
            resultado = "Usuario actualizado correctamente";
        }
    }

    return Json(resultado);
}


}








