window.onload = ListadoProfesion();

function ListadoProfesion() {
    $.ajax({
        url: '../../TiposProfesion/ListadoProfesion',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (TiposProfesion) {

            // $("#ModalTipoEjercicio").modal("hide");
            LimpiarModal();

            let contenidoTabla = ``;
        

            $.each(TiposProfesion, function (index, Profesion) { 
                
                { 
                    
                
                contenidoTabla += `
                    <tr>
                        <td>${Profesion.nombre}</td>
                        <td>${Profesion.matricula}</td>

                       
                        <td class="text-center"></td>
                        
                        <td class="text-center"></td>
                        <td class="text-center">
                        <button type="button" class="btn btn-success" onclick="AbrirModalEditar(${Profesion.profesionID})"> <i class="fa-regular fa-pen-to-square"></i> Editar</button>
                        <button type="button" class="btn btn-danger" onclick="EliminarProfesion(${Profesion.profesionID})"> <i class="fa-regular fa-trash-can"></i> Eliminar  </button>
                    </tr>`;
                }
            });

            document.getElementById("tbody-Profesion").innerHTML = contenidoTabla;
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al deshabilitar');
        }

    });



}

function GuardarProfesion() {


    // valor del modal
    let ProfesionID = document.getElementById("ProfesionID").value;
    let nombreProfesion = document.getElementById("nombreProfesion").value;
    let matricula = document.getElementById("matricula").value;


    $.ajax({
        url: '../../TiposProfesion/GuardarProfesion',
        data: { ProfesionID: ProfesionID, nombre: nombreProfesion,matricula:matricula},
        type: 'POST',
        dataType: 'json',
        success: function (resultado) {

           
       
            ListadoProfesion();
            $("#ModalProfesion").modal("hide");
        },
        error: function (xhr, status) {

            alert('Disculpe, existió un problema al guardar la actividad');
        }
    });
    }
    function AbrirModalEditar(ProfesionID) {
        $.ajax({
            url: '../../TiposProfesion/ListadoProfesion',
            data: { id: ProfesionID },
            type: 'POST',
            dataType: 'json',
            success: function (profesiones) {
                let profesion = profesiones[0];
    
                document.getElementById("ProfesionID").value = ProfesionID;
                document.getElementById("nombreProfesion").value = profesion.nombre;
                document.getElementById("matricula").value = profesion.matricula;
                $('#ModalProfesion').modal('show');
            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            }
        });
    }
    
    document.getElementById('btnGuardar').addEventListener('click', function() {
        let ProfesionID = document.getElementById("ProfesionID").value;
        let nombreProfesion = document.getElementById("nombreProfesion").value;
        let matricula = document.getElementById("matricula").value;
        
        $.ajax({
            url: '../../TiposProfesion/GuardarProfesion',
            data: {
                ProfesionID: ProfesionID,
                nombreProfesion: nombreProfesion,
                matricula: matricula
            },
            type: 'POST',
            dataType: 'json',
            success: function (respuesta) {
                $('#ModalProfesion').modal('hide');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    ListadoProfesion(); // Actualiza la lista de profesiones
                });
            },
            error: function (xhr, status) {
                Swal.fire({
                    title: "Error",
                    text: "Disculpe, existió un problema al guardar los datos.",
                    icon: "error"
                });
            }
        });
    });

    function EliminarProfesion(profesionID) {
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
                $.ajax({
                    url: '../../TiposProfesion/EliminarProfesion',
                    data: { profesionID: profesionID },
                    type: 'POST',
                    dataType: 'json',
                    success: function (Respuesta) {
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "Tu archivo ha sido eliminado.",
                            icon: "success"
                        }).then(() => {
                            ListadoProfesion();
                        });
                    },
                    error: function (xhr, status) {
                        Swal.fire({
                            title: "Error",
                            text: "Disculpe, existió un problema al eliminar el registro.",
                            icon: "error"
                        });
                    }
                });
            }
        });
    }
    


    function LimpiarModal() {
        document.getElementById("ProfesionID").value = "0";
        document.getElementById("nombreProfesion").value = "";
        document.getElementById("matricula").value = "";
    }
