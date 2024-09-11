


function agregarServicio() {
    let servicioID = document.getElementById("ServicioID").value;
    let personaID = document.getElementById("PersonaID").value;
    let profesionID = document.getElementById("ProfesionID").value;


    // Crear un objeto FormData para enviar archivos
    let formData = new FormData();
    formData.append("ServicioID", servicioID);
    formData.append("PersonaID", personaID);
    formData.append("ProfesionID", profesionID);

    // formData.append("herramienta", herramienta);
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
                if (servicioID == 0) {
                    CardServicios();
                }
                else {
                    agregarServicio();
                }

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

function EditarServicio() {
    let servicioID = document.getElementById("ServicioID").value;
    {
        $.ajax({
            url: '/Servicios/RecuperarPerfilServicio',
            data: { id: servicioID },
            type: 'POST',
            dataType: 'json',
            success: function (servicios) {
                let servicio = servicios[0];

                console.log(servicio.herramienta);

                document.getElementById("descripcion").value = servicio.descripcion;
                document.getElementById("herramienta").checked = servicio.herramienta;
                document.getElementById("titulo").value = servicio.titulo;
                document.getElementById("institucion").value = servicio.institucion;
                $('#agregarServicio').modal('show');
            },



            error: function (xhr, status) {
                console.log('Disculpe, existió un problema al cargar el servicio para editar');
            }
        });
    }


}


function LimpiarModal() {
    // document.getElementById("PersonaID").value = 0;
    // document.getElementById("ProfesionID").value = 0;
    // document.getElementById("herramientas").value = "";
    // document.getElementById("descripcion").value = "";
    // document.getElementById("descripcion").value = "";
    // document.getElementById("descripcion").value = "";
    // document.getElementById("descripcion").value = "";

}
