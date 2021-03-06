$(function () {
    $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') }
    });
});

document.getElementById("imageHome").addEventListener("click", function () {
    window.location.href = "main";
});

$(document).on("submit", "#formRegister", function (event) {
    event.preventDefault();
    var $form = $(this);
    var data = $(this).serialize();
    console.log("Serialize: "+data);
    var url_process = "http://192.168.1.8/Optica-ijc/ajax/process_register.php";
    var data_form = {
        iduser: $("#iduser").val(),
        name: $("#name").val(),
        phone: $("#phone").val(),
        birthdate: $("#birthdate").val(),
        address: $("#address").val(),
        eps: $("#eps").val()
    };
    console.log(data_form);
    $.ajax({
        type: 'POST',
        url: url_process,
        data: data_form,
        dataType: 'json',
        async: true
    })
        .done(function doneResponse(res) {
            console.log("Response--->");
            console.log(res);
            console.log(res.message);
            openDialog(res.message, res.title);
        })
        .fail(function errorResponse(e) {
            console.log("Error->");
            console.log(e.error);
            openDialog("Se ha producido un error desconocido", "Fallo con el servidor");
        })
        .always(function ajaxForm() {
            console.log("Ejecuta");
        });
});

function openDialog(value, title) {
    var dialog = document.querySelector('dialog');
    document.getElementById("message").innerHTML = value;
    document.getElementById("title_message").innerText = title;
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
        window.location.href = "index.php";
    });
}

$(document).on("submit", "#form_appointment", function () {
    event.preventDefault();
    var url_process = "http://192.168.1.8/MVCBase/remoto/registrarcita.php";
    var progress = document.getElementById("progress");
    var error = document.getElementById("error_mssg");
    progress.style.display = 'block';
    var data_form = {
        iduser: $("#iduser").val(),
        date: $("#dateSelected").val(),
        time: $("#timeSelected").val()
    };
    console.log(data_form);
    $.ajax({
        type: 'POST',
        url: url_process,
        data: data_form,
        dataType: 'json',
        async: true
    })
        .done(function doneResponse(res) {
            console.log("Response--->");
            console.log(res);
            error.style.display = 'none';
            console.log(res.schedule_complete);
            if (res.schedule_complete){
                schedule();
                dialogRequest(res.message);
            } else {
                progress.style.display = 'none';
                error.innerText = res.message;
                error.style.display = 'block';
            }
        })
        .fail(function errorResponse(e) {
            console.log("Error->");
            progress.style.display = 'none';
            console.log(e);
            error.innerText = "Se ha producido un error";
            error.style.display = 'block';
        })
        .always(function ajaxForm() {
            console.log("Ejecuta");
            //schedule();
        });
});

function schedule() {
    var dialog = document.querySelector('dialog');
    if (dialog.showModal) {
        dialog.close();
        console.log("close");
    }
}

function dialogRequest(message) {
    'use strict';
    var snackbarContainer = document.querySelector('#toast-request');
    'use strict';
    var data = {message: message};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

$(document).on("submit", "#admin_form", function () {
    event.preventDefault();
    var url_process = "http://192.168.1.8/MVCBase/libs/remote/inicioadmin.php";
    var progress = document.getElementById("progress");
    var error = document.getElementById("error_mssg");
    progress.style.display = 'block';
    var data_form = {
        username: $("#username").val(),
        password: $("#password").val()
    };
    console.log(data_form);
    $.ajax({
        type: 'POST',
        url: url_process,
        data: data_form,
        dataType: 'json',
        async: true
    })
        .done(function doneResponse(res) {
            console.log("Response--->");
            error.style.display = 'none';
            if (res.exist === undefined){
                console.log(res);
                progress.style.display = 'none';
                window.location.href = res.redirect;
            } else {
                progress.style.display = 'none';
                error.innerText = res.message;
                error.style.display = 'block';
            }
        })
        .fail(function errorResponse(e) {
            console.log("Error->");
            progress.style.display = 'none';
            console.log(e);
            error.innerText = "Se ha producido un error";
            error.style.display = 'block';
        })
        .always(function ajaxForm() {
            console.log("Execute Always");
        });
});

$(document).on("submit", "#user_form", function () {
    event.preventDefault();
    var url_process = "http://192.168.1.8/Optica-ijc/ajax/process_login.php";
    var progress = document.getElementById("progress");
    var error = document.getElementById("error_mssg");
    progress.style.display = 'block';
    var data_form = {
        usercommon: $("#usercommon").val(),
        passcommon: $("#passcommon").val()
    };
    console.log(data_form);
    $.ajax({
        type: 'POST',
        url: url_process,
        data: data_form,
        dataType: 'json',
        async: true
    })
        .done(function doneResponse(res) {
            console.log("Response--->");
            error.style.display = 'none';
            console.log(res);
            if (res.exist === undefined){
                console.log(res);
                progress.style.display = 'none';
                window.location.href = res.redirect;
            } else {
                progress.style.display = 'none';
                error.innerText = res.message;
                error.style.display = 'block';
            }
        })
        .fail(function errorResponse(e) {
            console.log("Error->");
            progress.style.display = 'none';
            console.log(e);
            error.innerText = "Se ha producido un error";
            error.style.display = 'block';
        })
        .always(function ajaxForm() {
            console.log("Execute Always");
        });
});

function adminlogin(){
    console.log("Entra---");
    window.location.href = "http://192.168.1.8/MVCBase/inicioadmin";
}

function userlogin(){
    window.location.href = "http://192.168.1.8/MVCBase/iniciousu";
}

function logout(){
    window.location.href = "http://192.168.1.8/MVCBase/salir";
}
function obtenerdatosformulas(paciente) {
    if (paciente !== undefined){
        $ajax({
           url: 'php/'
        });
    }
}