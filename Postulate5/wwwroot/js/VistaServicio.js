function CardServicios() {
    
    $.ajax({
        url: '/VistaServicio/CardServicios',
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
                    <div class="col-md-6 col-lg-4 mb-3 d-flex align-items-stretch card-container card-hoover tamanio-card" id="card-${persona.servicioID}">
                        <div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <div class="card-bg color-Card" style="width: 15em; height: 100%;"></div>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <a href="javascript:cargarPerfil(${persona.servicioID})" class="text-decoration-none text-dark">
                                            <h5 class="">${persona.nombrePersona} ${persona.apellidoPersona}</h5>
                                            <p class=""><strong>Teléfono:</strong> ${persona.telefonoPersona}</p>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="herramienta-${persona.servicioID}" disabled ${persona.herramienta ? 'checked' : ''}>
                                                <label class="form-check-label" for="herramienta-${persona.servicioID}">
                                                    ¿Este usuario cuenta con herramientas?
                                                </label>
                                            </div>
                                        </a>
                                        <div class="card-action mt-3">
                                            <button type="button" class="btn btn-success me-2" onclick="EditarServicio(${persona.servicioID})">
                                                <i class="fa-regular fa-pen-to-square"></i> Editar
                                            </button>
                                            <button type="button" class="btn btn-danger me-2" onclick="EliminarServicio(${persona.servicioID})">
                                                <i class="fa-regular fa-trash-can"></i> Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
                contenidoCard += `</div></div>`;;
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
        url: '/VistaServicio/AgregarServicio',
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
            url: '/VistaServicio/CardServicios',
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




function EliminarServicio(servicioID) {
    $.ajax({
        // la URL para la petición
        url: '../../VistaServicio/EliminarServicio',
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