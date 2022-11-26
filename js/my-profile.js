
const USUARIO = JSON.parse(localStorage.getItem('USUARIO'));
const FORM_PERFIL = document.getElementById('formulario-perfil');
const EMAIL_PERFIL = document.getElementById('perfil-email');
const NOMBRE1_PERFIL = document.getElementById('perfil-nombre');
const NOMBRE2_PERFIL = document.getElementById('perfil-nombre2');
const APELLIDO1_PERFIL = document.getElementById('perfil-apellido');
const APELLIDO2_PERFIL = document.getElementById('perfil-apellido2');
const TELEFONO_PERFIL = document.getElementById('perfil-telefono');

document.addEventListener('DOMContentLoaded', ()=>{
     NOMBRE1_PERFIL.value = USUARIO.nombre1;
     NOMBRE2_PERFIL.value = USUARIO.nombre2;
     APELLIDO1_PERFIL.value = USUARIO.apellido1;
     APELLIDO2_PERFIL.value = USUARIO.apellido2;
     EMAIL_PERFIL.value = USUARIO.email;
     TELEFONO_PERFIL.value = USUARIO.telefono;
});

FORM_PERFIL.addEventListener('submit', ()=>{

    USUARIO.nombre1 = NOMBRE1_PERFIL.value;
    USUARIO.nombre2 = NOMBRE2_PERFIL.value;
    USUARIO.apellido1 = APELLIDO1_PERFIL.value;
    USUARIO.apellido2 = APELLIDO2_PERFIL.value;
    USUARIO.email = EMAIL_PERFIL.value;
    USUARIO.telefono = TELEFONO_PERFIL.value;

    localStorage.setItem('USUARIO', JSON.stringify(USUARIO));
});

