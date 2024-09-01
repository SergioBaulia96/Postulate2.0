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
                        <td><button type="button" class="edit-button" onclick="AbrirModalEditar(${Persona.PersonaID})"><svg class="edit-svgIcon" viewBox="0 0 512 512">
                 
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


function AbrirModalEditar(PersonaID) {

    $.ajax({
        url: '../../Persona/RecuperarPerfilPersona',
        data: { id: PersonaID },
        type: 'POST',
        dataType: 'json',
        success: function (personas) {
            let persona = personas[0];

            
          
            document.getElementById("nombre").value = persona.nombre;
            document.getElementById("apellido").value = persona.apellido;
            document.getElementById("edad").value = persona.edad;
            document.getElementById("telefono").value = persona.telefono;
            document.getElementById("documento").value = persona.documento;
          

            $("#ModalFormulario").modal("show");

        },
        error: function (xhr, status) {

            alert('Disculpe, existió un problema ');
        }

    });

}
