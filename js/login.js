let alertaEmail = document.getElementById('validacionEmail');
let alertaContrasenia = document.getElementById('validacionContrasenia');
// creamos el carrito en el localStorage
localStorage.setItem('carrito', JSON.stringify([]));

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("inicioSesion").addEventListener('submit', validarFormulario); 
  });
  
  function validarFormulario(e) {
    e.preventDefault();
    // dos booleanos que serán verdaderos si los datos están ingresados correctamente
    // y de ser así se ocultará la autenticación y se mostrará el landing
    let booleano1 = false;
    let booleano2 = false;

    // usamos el value de los diferentes inputs a ver si cumplen con los requisitos
    let email = document.getElementById('emailUsuario');    
    if(email.value.length == 0) {
      alertaEmail.style.display = 'contents';
    } else {
      booleano1 = true;
    }

    let contrasenia = document.getElementById('contraseniaUsuario');
    if (contrasenia.value.length < 6) {
        alertaContrasenia.style.display = 'contents';
    } else {
      booleano2 = true;
    }
    // si se cumplen las condiciones se muestra la página
    if ((booleano1 == true)&&(booleano2 == true)){
      localStorage.removeItem('inicioSesionUsuario');
      localStorage.setItem('inicioSesionUsuario', email.value);
      localStorage.removeItem('inicioSesionUsuarioID');
      localStorage.setItem('inicioSesionUsuarioID', "25801");
      window.location.href = 'index.html';
    }
  }
 
  