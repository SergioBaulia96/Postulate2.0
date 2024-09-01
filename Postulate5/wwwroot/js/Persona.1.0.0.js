$(document).ready(function() {
    $("#formulario").on("submit", function(event) {
        event.preventDefault();
        if (Guardar()) {
            enviarFormularioAjax();
        }
    });
});

function Guardar() {
    console.log("probando");

    // Limpiar mensajes de error anteriores
    $(".error-message").remove();

    let isValid = true;

    if ($("#ProvinciaID").val() === "") {
        $("#ProvinciaID").after('<div class="error-message text-danger">El campo Provincia no puede estar vacío.</div>');
        $("#ProvinciaID").focus();
        isValid = false;
    }
    if ($("#LocalidadID").val() === "") {
        $("#LocalidadID").after('<div class="error-message text-danger">El campo Localidad no puede estar vacío.</div>');
        if (isValid) $("#LocalidadID").focus(); // Solo enfocar si es el primer error
        isValid = false;
    }
    if ($("#nombre").val() === "") {
        $("#nombre").after('<div class="error-message text-danger">El campo Nombre no puede estar vacío.</div>');
        if (isValid) $("#nombre").focus();
        isValid = false;
    }
    if ($("#apellido").val() === "") {
        $("#apellido").after('<div class="error-message text-danger">El campo Apellidos no puede estar vacío.</div>');
        if (isValid) $("#apellido").focus();
        isValid = false;
    }
    if ($("#edad").val() === "") {
        $("#edad").after('<div class="error-message text-danger">El campo Edad no puede estar vacío.</div>');
        if (isValid) $("#edad").focus();
        isValid = false;
    }
    if ($("#telefono").val() === "") {
        $("#telefono").after('<div class="error-message text-danger">El campo Teléfono no puede estar vacío.</div>');
        if (isValid) $("#telefono").focus();
        isValid = false;
    }
    if ($("#documento").val() === "") {
        $("#documento").after('<div class="error-message text-danger">El campo Documento no puede estar vacío.</div>');
        if (isValid) $("#documento").focus();
        isValid = false;
    }

    return isValid;
}
function enviarFormularioAjax() {
    console.log("probando2");
    let formulario = $("#formulario").serialize(); // Serializa el formulario

    $.ajax({
        url: '../../Persona/Guardar',
        data: formulario,
        type: 'POST',
        dataType: 'json',
        success: function(resultado) {
            alert(resultado.mensaje);
            console.log("Formulario guardado exitosamente");
            $("#formulario").fadeOut("slow");   // Hacemos desaparecer el div "formulario" con un efecto fadeOut lento.
            if (resultado.exito) {  // Verifica si el resultado contiene un campo indicando éxito
                $("#exito").delay(500).fadeIn("slow");  // Si hemos tenido éxito, hacemos aparecer el div "exito" con un efecto fadeIn lento tras un delay de 0,5 segundos.
            } else {
                $("#fracaso").delay(500).fadeIn("slow");  // Si no, lo mismo, pero haremos aparecer el div "fracaso".
            }
        },
        error: function(xhr, status) {
            alert('Disculpe, existió un problema al guardar el formulario');
        }
    });
}







