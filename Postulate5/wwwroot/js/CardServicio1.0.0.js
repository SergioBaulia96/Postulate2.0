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

function cargarPerfil(servicioID) {

    window.location.href = `/Servicios/VistaServicio/${servicioID}`;
}