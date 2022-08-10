document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("inicioSesion").addEventListener('submit', validarFormulario); 
  });

  let alertaEmail = document.getElementById('validacionEmail');
  let alertaContrasenia = document.getElementById('validacionContrasenia');

  function esconderAlertas(){
    document.getElementById('emailUsuario').addEventListener('onkeypress', () => alertaEmail.style.display = 'none');
    document.getElementById('contraseniaUsuario').addEventListener('onkeypress', () => alertaEmail.style.display = 'none');
  }
  
  function validarFormulario(e) {
    e.preventDefault();
    let email = document.getElementById('emailUsuario');    
    if(email.value.length == 0) {
      alertaEmail.style.display = 'inline-block';
      email.addEventListener('onkeypress', () => alertaEmail.style.display = 'none');
    }
    let contrasenia = document.getElementById('contraseniaUsuario');
    if (contrasenia.value.length < 6) {
        alertaContrasenia.style.display = 'inline-block';
    }
  }