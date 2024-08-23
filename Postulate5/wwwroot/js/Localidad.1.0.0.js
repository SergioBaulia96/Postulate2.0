window.onload = ListadoLocalidad();

function ListadoLocalidad() {
    $.ajax({
        url: '../../Localidad/ListadoLocalidad',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (Localidades) {

             $("#ModalLocalidad").modal("hide");
             LimpiarModal();

            let contenidoTabla = ``;
            


            $.each(Localidades, function (index, Localidad) { 
                
                { 
                    
                
                contenidoTabla += `
                    <tr>
                       <td>${Localidad.provinciaNombre}</td>
                        <td>${Localidad.nombre}</td>
                         <td>${Localidad.codigoPostal}</td>

                       
                        <td class="text-center"></td>
                        
                        <td class="text-center"></td>
                        <td class="text-center">
                        <button type="button" class="btn btn-success" onclick="AbrirModalEditar(${Localidad.localidadID})"> <i class="fa-regular fa-pen-to-square"></i> Editar</button>
                        <button type="button" class="btn btn-danger" onclick="EliminarLocalidad(${Localidad.localidadID})"> <i class="fa-regular fa-trash-can"></i> Eliminar  </button>
                    </tr>`;
                }
            });

            document.getElementById("tbody-Localidades").innerHTML = contenidoTabla;
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al deshabilitar');
        }

    });



}

function GuardarLocalidad() {
   
    let localidadID = document.getElementById("LocalidadID").value;
    let provinciaID = document.getElementById("ProvinciaID").value; 
    let nombreLocalidad = document.getElementById("nombreLocalidad").value;
    let codigoPostal = document.getElementById("CodigoPostal").value;


    $.ajax({
        url: '../../Localidad/GuardarLocalidad',
        data: {
            localidadID: localidadID,
            provinciaID: provinciaID,
            nombre: nombreLocalidad,
            codigoPostal: codigoPostal
        },
        type: 'POST',
        dataType: 'json',
        success: function (resultado) {
            ListadoLocalidad();
             $("#ModalLocalidad").modal("hide");
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al guardar la actividad');
        }
    });
}
function AbrirModalEditar(LocalidadID) {
    $.ajax({
        url: '../../Localidad/ListadoLocalidad',
        data: { id: LocalidadID },
        type: 'POST',
        dataType: 'json',
        success: function (localidades) {
            let localidad = localidades[0];

            document.getElementById("LocalidadID").value = LocalidadID;
            // $("#ModalTitulo").text("Editar Tipo De ejercico");
            document.getElementById("nombreLocalidad").value = localidad.nombre;
            document.getElementById("CodigoPostal").value = localidad.codigoPostal;
            $('#ModalLocalidad').modal('show');
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema ');
        }
    });
}

document.getElementById("btnGuardarLocalidad").addEventListener("click", function() {
   

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });
});

    function EliminarLocalidad(LocalidadID) {
        Swal.fire({
            title: '¿Está seguro?',
            text: "¡No podrá revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '../../Localidad/EliminarLocalidad',
                    data: { LocalidadID: LocalidadID },
                    type: 'POST',
                    dataType: 'json',
                    success: function (Respuesta) {
                        ListadoLocalidad();
                        Swal.fire(
                            '¡Eliminado!',
                            'La localidad ha sido eliminada.',
                            'success'
                        );
                    },
                    error: function (xhr, status) {
                        console.log('Disculpe, existió un problema al consultar el registro para eliminado');
                        Swal.fire(
                            'Error',
                            'Hubo un problema al eliminar la localidad.',
                            'error'
                        );
                    }
                });
            }
        });
    }
function LimpiarModal() {
    document.getElementById("LocalidadID").value = 0;
    document.getElementById("ProvinciaID").value = 0;
    document.getElementById("nombreLocalidad").value = "";
    document.getElementById("CodigoPostal").value = "";
}
