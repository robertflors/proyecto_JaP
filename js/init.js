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
// En esta forma se agregan Li de forma dinámica a los navbar de la carpeta sin necesidad de un li con ID.

// function usuarioEnNavbar() {

//   let navbar = document.getElementsByClassName('navbar-nav');
 
//   let listItem = document.createElement('li');

//   let usuario = localStorage.getItem('usuario');
  
//   listItem.append(usuario);
//   listItem.classList.add('nav-item' , 'nav-item-usuario');

//  for (const item of navbar) {
//     item.appendChild(listItem)};
//  }
// usuarioEnNavbar();


// En esta forma se colocó ID manualmente a todos los li de navbar de la carpeta
function usuarioEnNavbar() {
  let navbarUsuario = document.getElementById('nav-item-usuario');
  let perfilUsuario = document.createElement('a');
  let usuario = localStorage.getItem('usuario');
  
  perfilUsuario.classList.add('nav-link');
  perfilUsuario.append(usuario);

  navbarUsuario.appendChild(perfilUsuario);
}
usuarioEnNavbar();