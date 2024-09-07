window.onload = RecuperarPerfilPersona();

function RecuperarPerfilPersona() {
    $.ajax({
        url: '../../Persona/RecuperarPerfilPersona',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (Personas) {

       
           

            let contenidoTabla = ``;



            $.each(Personas, function (index, Persona) {

                {


                    contenidoTabla += `
                    <tr>

                    
                    
                       <td>${Persona.nombreLocalidad}</td>
                        <td>${Persona.nombre}</td>
                        <td>${Persona.apellido}</td>
                        <td>${Persona.telefono}</td>
                        <td>${Persona.edad}</td>
                        <td>${Persona.documento}</td>
                        <td>${Persona.email}</td>
                        <td><button type="button" class="edit-button" onclick="EditarPefil(${Persona.personaID})"><svg class="edit-svgIcon" viewBox="0 0 512 512">
                 
                   </button></td>
                        <td><button type="button" class="delete-button" onclick="EliminarLocalidad(${Persona.PersonaID})"><svg class="delete-svgIcon" viewBox="0 0 448 512">
                  
                    </svg></button></td>
                    </tr>`;
                }
            });
            document.getElementById("tbody-Persona").innerHTML = contenidoTabla;
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al deshabilitar');
        }

    });



}


function EditarPefil(personaID) {

    document.getElementById("PersonaID").value = personaID;

    $.ajax({
        url: '../../Persona/RecuperarPerfilPersona',
        data: { id: personaID },
        type: 'POST',
        dataType: 'json',
        success: function (personas) {
            let Persona = personas[0];
            document.getElementById("PersonaID").value = Persona.personaID;
            document.getElementById("nombre").value = Persona.nombre;
            document.getElementById("apellido").value = Persona.apellido;
            document.getElementById("edad").value = Persona.edad;
            document.getElementById("documento").value = Persona.documento;
            document.getElementById("telefono").value = Persona.telefono;

            $("#ModalVistaPersona").modal("show");

        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema ');
        }
    });
}

function GuardarPerfil() {
    var personaID = $('#PersonaID').val();
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var edad = $('#edad').val();
    var telefono = $('#telefono').val();
    var documento = $('#documento').val();
    var correo = "";  // Si tienes un campo de correo, obtén su valor aquí
    var localidadId = 1;  // Asegúrate de tener el valor correcto de la localidad, o puedes asignarlo dinámicamente

    $.ajax({
        url: '/Persona/GuardarPerfil',
        type: 'POST',
        data: {
            personaID: personaID,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            telefono: telefono,
            documento: documento,
            correo: correo,
            localidadId: localidadId
        },
        success: function (response) {
            alert(response);
            // Puedes agregar lógica adicional para actualizar la tabla o cerrar el modal
            RecuperarPerfilPersona()
            $("#ModalVistaPersona").modal("hide");
        },
        error: function (error) {
            console.log(error);
            alert('Ocurrió un error al guardar los datos.');
        }
    });
}




