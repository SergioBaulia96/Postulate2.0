window.onload = ListadoProvincia();

function ListadoProvincia() {
    $.ajax({
        url: '../../Provincia/ListadoProvincia',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (Provincias) {

            // $("#ModalTipoEjercicio").modal("hide");
            // LimpiarModal();

            let contenidoTabla = ``;
            LimpiarModal();

            $.each(Provincias, function (index, Provincia) { 
                
                { 
                    
                
                contenidoTabla += `
                    <tr>
                        <td>${Provincia.nombre}</td>

                       
                        <td class="text-center"></td>
                        
                        <td class="text-center"></td>
                        <td class="text-center">
                        <button type="button" class="btn btn-success" onclick="AbrirModalEditar(${Provincia.provinciaID})"> <i class="fa-regular fa-pen-to-square"></i> Editar</button>
                        <button type="button" class="btn btn-danger" onclick="EliminarProvincia(${Provincia.provinciaID})"> <i class="fa-regular fa-trash-can"></i> Eliminar  </button>
                    </tr>`;
                }
            });

            document.getElementById("tbody-Provincias").innerHTML = contenidoTabla;
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al deshabilitar');
        }

    });



}
function GuardarProvincia() {


    // valor del modal
    let ProvinciaID = document.getElementById("ProvinciaID").value;
    let nombreProvincia = document.getElementById("nombreProvincia").value;


    $.ajax({
        url: '../../Provincia/GuardarProvincia',
        data: { ProvinciaID: ProvinciaID, nombre: nombreProvincia },
        type: 'POST',
        dataType: 'json',
        success: function (resultado) {

           
       
            ListadoProvincia();
            $("#ModalProvincia").modal("hide");
        },
        error: function (xhr, status) {

            alert('Disculpe, existió un problema al guardar la actividad');
        }
    });
    }

    function AbrirModalEditar(provinciaID) {

        $.ajax({
            url: '../../Provincia/ListadoProvincia',
            data: { id: provinciaID },
            type: 'POST',
            dataType: 'json',
            success: function (provincias) {
                let provincia = provincias[0];
    
                document.getElementById("ProvinciaID").value = provinciaID;
                // $("#ModalTitulo").text("Editar Tipo De ejercico");
                document.getElementById("nombreProvincia").value = provincia.nombre;
                $("#ModalProvincia").modal("show");
    
            },
            error: function (xhr, status) {
    
                alert('Disculpe, existió un problema ');
            }
    
        });
    
    }

    function EliminarProvincia(provinciaID) {
        // Mostrar alerta de confirmación antes de realizar la eliminación
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Realizar la llamada AJAX solo si el usuario confirma
                $.ajax({
                    url: '../../Provincia/EliminarProvincia',
                    data: { provinciaID: provinciaID },
                    type: 'POST',
                    dataType: 'json',
                    success: function (Respuesta) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Provincia eliminada con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            ListadoProvincia(); // Actualiza la lista de provincias
                        });
                    },
                    error: function (xhr, status) {
                        Swal.fire({
                            title: "Error",
                            text: "Disculpe, existió un problema al eliminar la provincia.",
                            icon: "error"
                        });
                    }
                });
            }
        });
    }
    

    


function LimpiarModal(){
   
    document.getElementById("ProvinciaID").value = 0;
    document.getElementById("nombreProvincia").value = "";


}