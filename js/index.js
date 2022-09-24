document.addEventListener("DOMContentLoaded", function(){
    // condición que si no hay una sesión iniciada reenviará a login.html
    if(localStorage.getItem('inicioSesionUsuario') === null){
        window.location.href = 'login.html';
    }
    
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});