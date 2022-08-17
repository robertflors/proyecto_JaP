let indexAutenticacion = document.getElementById("autenticacion");
let indexLanding = document.getElementById("landingPage");

let alertaEmail = document.getElementById('validacionEmail');
let alertaContrasenia = document.getElementById('validacionContrasenia');

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("inicioSesion").addEventListener('submit', validarFormulario); 
  });

  function esconderAlertas(){
    document.getElementById('emailUsuario').addEventListener('onkeypress', () => alertaEmail.style.display = 'none');
    document.getElementById('contraseniaUsuario').addEventListener('onkeypress', () => alertaEmail.style.display = 'none');
  }
  
  function validarFormulario(e) {
    e.preventDefault();
    // dos booleanos que serán verdaderos si los datos están ingresados correctamente
    // y de ser así se ocultará la autenticación y se mostrará el landing
    let booleano1 = false;
    let booleano2 = false;

    // usamos el value de los diferentes inputs a ver si cumplen con los requisitos
    let email = document.getElementById('emailUsuario');    
    if(email.value.length == 0) {
      alertaEmail.style.display = 'inline-block';
    } else {
      booleano1 = true;
    }

    let contrasenia = document.getElementById('contraseniaUsuario');
    if (contrasenia.value.length < 6) {
        alertaContrasenia.style.display = 'inline-block';
    } else {
      booleano2 = true;
    }
    // si se cumplen las condiciones se muestra la página
    if ((booleano1 == true)&&(booleano2 == true)){
      indexAutenticacion.style.display = 'none';
      indexLanding.style.display = 'contents';
    }
  }