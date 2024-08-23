function CardTrabajos() {
    $.ajax({
        url: '/VistaTrabajo/CardTrabajos',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (tiposProfesionMostrar) {
            console.log(tiposProfesionMostrar);

            let contenidoCard = ``;

            $.each(tiposProfesionMostrar, function (index, tipoProfesion) {
                contenidoCard += `
                    <div class="profesion-group">
                        <h3 class="text-center">${tipoProfesion.nombre}</h3>
                        <div class="row justify-content-start">`;

                $.each(tipoProfesion.listadoPersonas, function (index, persona) {
                    contenidoCard += `
                        <div class="col-md-4 col-sm-6 d-flex align-items-stretch card-container" id="card-${persona.trabajoID}">
                            <div class="tamaniocard">
                                <div class="card-content">
                                    <p class="lugar"> <strong>Nombre:</strong>${persona.nombrePersona}</p>
                                    <p class="lugar"><strong>Apellido:</strong> ${persona.apellidoPersona}</p>
                                      <p class="lugar"><strong>Teléfono:</strong> ${persona.telefonoPersona}</p>
                                    <p class="lugar"><strong>Direccion:</strong> ${persona.direccion}</p>
                                    <p class="lugar"><strong>Descrpicion:</strong> ${persona.descripcion}</p>
                                   <p class="lugar"><strong>Hora:</strong>${persona.hora}</p>
                                    <p class="lugar"><strong>Fecha de inicio:</strong>${persona.fecha}</p>
                                   <p class="lugar"><strong>Comentario:</strong> ${persona.comentario}</p>
                                    <div class="card-action">
                                        <button type="button" class="btn btn-success" onclick="EditarTrabajo(${persona.trabajoID})">
                                            <i class="fa-regular fa-pen-to-square"></i> Editar
                                        </button>
                                        <button type="button" class="btn btn-danger" onclick="EliminarTrabajo(${persona.trabajoID})">
                                            <i class="fa-regular fa-trash-can"></i> Eliminar
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
            alert('Disculpe, existió un problema al cargar los trabajos');
        }
    });
}


// Llama a la función para cargar las tarjetas al cargar la página
document.addEventListener("DOMContentLoaded", CardTrabajos);



function agregarTrabajo() {
    let personaID = document.getElementById("PersonaID").value;
    let trabajoID = document.getElementById("TrabajoID").value;
    let profesionID = document.getElementById("ProfesionID").value;
    let descripcion = document.getElementById("descripcion").value;
    let direccion = document.getElementById("direccion").value;
    let hora = document.getElementById("hora").value;
    let fecha = document.getElementById("fecha").value;
    let comentario = document.getElementById("comentario").value;



    let formData = new FormData();

    formData.append("TrabajoID", trabajoID);
    formData.append("PersonaID", personaID);
    formData.append("ProfesionID", profesionID);
    formData.append("descripcion", descripcion);
    formData.append("direccion", direccion);
    formData.append("hora", hora);
    formData.append("fecha", fecha);
    formData.append("comentario", comentario);



    $.ajax({
        // URL para la petición
        url: '/VistaTrabajo/AgregarTrabajo',
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
                alert("Trabajo guardado exitosamente");

                $('#agregarTrabajo').modal('hide');

                CardTrabajos();
            } else {
                alert("Error al guardar el Trabajo: " + response.message);
            }
        },
        // Código a ejecutar si la petición falla
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el Trabajo');
        }
    });


}

// function EditarTrabajo(TrabajoID) {
//     $.ajax({
//         url: '/Trabajo/CardTrabajos',
//         data: { id: TrabajoID },
//         type: 'GET',
//         dataType: 'json',
//         success: function (trabajo) {
//             if (trabajo) {
//                 document.getElementById("TrabajoID").value = trabajo.TrabajoID;
//                 document.getElementById("PersonaID").value = trabajo.PersonaID;
//                 document.getElementById("ProfesionID").value = trabajo.ProfesionID;
//                 document.getElementById("descripcion").value = trabajo.Descripcion;
//                 document.getElementById("hora").value = trabajo.Hora;
//                 document.getElementById("fecha").value = trabajo.Fecha;
//                 document.getElementById("direccion").value = trabajo.Direccion;
//                 document.getElementById("comentario").value = trabajo.Comentario;
//                 $('#agregarTrabajo').modal('show');
//             }
//         },
//         error: function (xhr, status) {
//             console.log('Disculpe, existió un problema al cargar el servicio para editar');
//         }
//     });
// }

function EditarTrabajo(trabajoID) {
    $.ajax({
        url: '/VistaTrabajo/CardTrabajos',
        data: { id: trabajoID },
        type: 'POST',
        dataType: 'json',
        success: function (vistaTrabajoPersonas) {
            let trabajo = vistaTrabajoPersonas[0];


            document.getElementById("TrabajoID").value = trabajoID;

            document.getElementById("PersonaID").value = trabajo.personaID;
            document.getElementById("ProfesionID").value = trabajo.profesionID;
            document.getElementById("descripcion").value = trabajo.descripcion;
            document.getElementById("hora").value = trabajo.hora;
            document.getElementById("fecha").value = trabajo.fecha;
            document.getElementById("direccion").value = trabajo.direccion;
            document.getElementById("comentario").value = trabajo.comentario;
            $('#agregarTrabajo').modal('show');

        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el servicio para editar');
        }
    });
}

function EliminarTrabajo(trabajoID) {
    $.ajax({
        // la URL para la petición
        url: '../../VistaTrabajo/EliminarTrabajo',
        data: { trabajoID: trabajoID },
        type: 'POST',
        dataType: 'json',
        success: function (Respuesta) {
            CardTrabajos();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para eliminado');
        }
    });
}