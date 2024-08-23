function CardServicios() {
    
    $.ajax({
        url: '/Servicios/CardServicios',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (tiposProfesionMostrar) {
            console.log(tiposProfesionMostrar);

            let contenidoCard = ``;
            $.each(tiposProfesionMostrar, function (index, tipoProfesion) {
                contenidoCard += `
                    <div class="profesion-group">
                        <h3>${tipoProfesion.nombre}</h3>
                        <div class="row justify-content-start">`; // Justificación al inicio
            
                LimpiarModal();
            
                $.each(tipoProfesion.listadoPersonas, function (index, persona) {
                    contenidoCard += `
                    <div class="col-md-4 col-sm-6 d-flex align-items-stretch card-container" id="card-${persona.servicioID}">
                        <div class="tamaniocard">
                            <div class="card-content">
                                <p class="lugar"><strong>Nombre:</strong> ${persona.nombrePersona}</p>
                                <p class="lugar"><strong>Apellido:</strong> ${persona.apellidoPersona}</p>
                                <p class="lugar"><strong>Telefono:</strong> ${persona.telefonoPersona}</p>
                                <div class="card-action">
                                    <button type="button" class="btn btn-success" onclick="EditarServicio(${persona.servicioID})">
                                        <i class="fa-regular fa-pen-to-square"></i> Editar
                                    </button>
                                    <button type="button" class="btn btn-danger" onclick="EliminarServicio(${persona.servicioID})">
                                        <i class="fa-regular fa-trash-can"></i> Eliminar
                                    </button>
        <button type="button" class="btn btn-primary" onclick="cargarPerfil(${persona.servicioID})">
    <i class="fa-regular fa-eye"></i> Ver más
</button>

                                </div>
                            </div>
                        </div>
                    </div>`;
                
                });
            
                contenidoCard += `</div></div>`;
            });
            
            document.getElementById("contenedorCards").innerHTML = contenidoCard;
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al cargar los servicios');
        }
    });
}
// Llama a la función para cargar las tarjetas al cargar la página
document.addEventListener("DOMContentLoaded", CardServicios);







function agregarServicio() {

 
    let personaID = document.getElementById("PersonaID").value;
    let servicioID = document.getElementById("ServicioID").value;
  
    let profesionID = document.getElementById("ProfesionID").value;
    // let nombre = document.getElementById("nombre").value;
    // let imagen = document.getElementById("imagen").files[0]; // Archivo de imagen
    let herramientas = document.getElementById("herramientas").checked;
    // let descripcion = document.getElementById("descripcion").value;
    // let titulo = document.getElementById("titulo").value;
    // let institucion = document.getElementById("institucion").value;

    // Crear un objeto FormData para enviar archivos
    let formData = new FormData();
    formData.append("ServicioID", servicioID);
    formData.append("PersonaID", personaID);
    formData.append("ProfesionID", profesionID);
    // formData.append("Nombre", nombre);
    // formData.append("Imagen", imagen);
    formData.append("Herramientas", herramientas);
    // formData.append("Descripcion", descripcion);
    // formData.append("Titulo", titulo);
    // formData.append("Institucion", institucion);

    $.ajax({
        // URL para la petición
        url: '/Servicios/AgregarServicio',
        // Información a enviar
        data: formData,
        // Especifica si será una petición POST
        type: 'POST',
        // Tipo de información que se espera de respuesta
        dataType: 'json',
        // Necesario para enviar archivos
        processData: false,
        contentType: false,
        // Código a ejecutar si la petición es satisfactoria
        success: function (response) {
            if (response.success) {
                alert("Servicio guardado exitosamente");
                // Cerrar el modal
                $('#agregarServicio').modal('hide');
                // Opcional: recargar la lista de servicios
                CardServicios();
            } else {
                alert("Error al guardar el servicio: " + response.message);
            }
        },
        // Código a ejecutar si la petición falla
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el servicio');
        }
    });
}

function EditarServicio(servicioID) {



    {
        $.ajax({
            url: '/Servicios/CardServicios',
            data: { id: servicioID },
            type: 'POST',
            dataType: 'json',
            success: function (servicio) {
                let servicios = servicio[0]; 
                
                document.getElementById("PersonaID").value = servicios.personaID;

                document.getElementById("ServicioID").value = servicios.servicioID;
        
                document.getElementById("ProfesionID").value = servicios.profesionID;
                // document.getElementById("nombre").value = servicios.nombrePersona;

                // document.getElementById("imagen").files[0]; // Archivo de imagen
                document.getElementById("herramientas").checked = servicios.herramienta;
                // document.getElementById("descripcion").value = servicios.descripcion;
                // document.getElementById("titulo").value = servicios.titulo;
                // document.getElementById("institucion").value = servicios.institucion;
                $('#agregarServicio').modal('show');
            },



            error: function (xhr, status) {
                console.log('Disculpe, existió un problema al cargar el servicio para editar');
            }
        });
    }


}


// function EditarServicio(servicioID) {
//     $.ajax({
//         url: '/Servicios/ObtenerServicio', // Cambiar al endpoint correcto
//         data: { id: servicioID }, // Enviar el ID del servicio
//         type: 'GET', // Usar GET para obtener datos
//         dataType: 'json', // Esperar una respuesta JSON
//         success: function (response) {
//             if (response.success) {
//                 let servicio = response.servicio;

//                 document.getElementById("ServicioID").value = servicio.servicioID;
//                 document.getElementById("PersonaID").value = servicio.personaID;
//                 document.getElementById("ProfesionID").value = servicio.profesionID;
//                 document.getElementById("nombre").value = servicio.nombrePersona;
//                 // document.getElementById("imagen").files[0]; // Manejo de imagen si es necesario
//                 document.getElementById("herramientas").checked = servicio.herramienta;
//                 document.getElementById("descripcion").value = servicio.descripcion;
//                 document.getElementById("titulo").value = servicio.titulo;
//                 document.getElementById("institucion").value = servicio.institucion;

//                 $('#agregarServicio').modal('show');
//             } else {
//                 console.log('Error: ' + response.message);
//             }
//         },
//         error: function (xhr, status) {
//             console.log('Disculpe, existió un problema al cargar el servicio para editar');
//         }
//     });
// }

function EliminarServicio(servicioID) {
    $.ajax({
        // la URL para la petición
        url: '../../Servicios/EliminarServicio',
        data: { servicioID: servicioID },
        type: 'POST',
        dataType: 'json',
        success: function (Respuesta) {
            CardServicios();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para eliminado');
        }
    });
}

function LimpiarModal(){
    // document.getElementById("PersonaID").value = 0;
    // document.getElementById("ProfesionID").value = 0;
    // document.getElementById("herramientas").value = "";
    // document.getElementById("descripcion").value = "";
    // document.getElementById("descripcion").value = "";
    // document.getElementById("descripcion").value = "";
    // document.getElementById("descripcion").value = "";

}


function cargarPerfil(servicioID) {

    window.location.href = `/Servicios/VistaServicio/${servicioID}`;
}