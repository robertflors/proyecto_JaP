const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

// -------------------Agregando el nombre del usuario a la barra de navegación-----------------------
function usuarioEnNavbar() {
  let navbarUsuario = document.getElementById('nav-item-usuario');
  let usuario = localStorage.getItem('inicioSesionUsuario');
   navbarUsuario.innerHTML = `${usuario}`; 
}
usuarioEnNavbar();

// --------------------Botón para cerrar sesión------------------------------------------------------
let cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', cerrandoSesion);

function cerrandoSesion(){
  // bastará con borrar el value del key, ya que el index.js tiene una condición que si el value de ese key es "null" redirigirá a login.html
  localStorage.removeItem('inicioSesionUsuario');
}