const URL_CON_ID = PRODUCT_INFO_URL + localStorage.getItem('productoInfoID') + EXT_TYPE;
const URL_COMENTARIOS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('productoInfoID') + EXT_TYPE;
const contenedorProducto = document.getElementById('productoInfoDetallada');
const tituloProducto = document.getElementById('tituloProductoInfo');
const comentariosUsuarios = document.getElementById('productoComentariosDesplegados');
let comentarios;


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(URL_CON_ID).then(function (resultObj) {
        if (resultObj.status === "ok") {
            tituloProducto.append(resultObj.data.name);
            showProductsInfo(resultObj.data);    
        }
    });

    getJSONData(URL_COMENTARIOS).then(function (resultObj) {
        if (resultObj.status === "ok") {           
            showProductsComents(resultObj.data);
            comentarios = resultObj.data;
        }
    });
});

// FUNCIÓN PARA MOSTRAR LA INFO DEL PRODUCTO SELECCIONADO EN FORMA DE LISTA
function showProductsInfo(data){
    contenedorProducto.innerHTML = '';

    contenedorProducto.innerHTML = `
  <div class="container">
    <ul class="list-group list-group-flush">
      <li class="list-group-item mb-4">
        <p class="h5 fw-bold">Precio</p>
        <p>${data.cost}</p>
      </li>
      <li class="list-group-item mb-4">
        <p class="h5 fw-bold">Descripción</p>
        <p>${data.description}</p>
      </li>
      <li class="list-group-item mb-4">
        <p class="h5 fw-bold">Categoría</p>
        <p>${data.category}</p>
      </li>
      <li class="list-group-item mb-4">
        <p class="h5 fw-bold">Cantidad de vendidos</p>
        <p>${data.soldCount}</p>
      </li>
      <li class="list-group-item mb-4">
        <p class="h5 fw-bold">Imágenes ilustrativas</p>
        <div class="container d-flex justify-content-evenly">
          ${arrayImagenes(data.images)}
        </div>
      </li>
    </ul>
  </div>`
}

// función que itera el array de imágenes del producto y retorna un string de DIVS
function arrayImagenes(imagenes) {
    let grupoDivsImg = '';
    for (const img of imagenes){
        grupoDivsImg += `<div class="contenedorProductoImg shadow-sm p-3 mb-5 bg-body rounded"><img src"${img}">${img}</div>`;
    }
    return grupoDivsImg;   
  }

// función que muestra los comentarios de los usuarios
function showProductsComents(comentarios){
    comentariosUsuarios.innerHTML = '';

    for(const comentario of comentarios){
        comentariosUsuarios.innerHTML += `
        <li class="list-group-item">
            <div>
                <p><strong>${comentario.user}</strong> - ${comentario.dateTime} - ${puntuacionProducto(comentario.user)}</p> 
            </div>
            <p>${comentario.description}</p>
        </li>
        `;
        // para colorear las estrellas según el puntaje de cada usuario
        puntuacionColor(comentario.score, comentario.user);
    }
            
}

// FUNCION PARA AGREGAR LOS SPAN ESTRELLAS Y LES SETEA UNA CLASE PARTICULAR POR USUARIO
function puntuacionProducto(usuario){
    let estrellas = `
        <span class="fa fa-star puntuacionDe${usuario}"></span>
        <span class="fa fa-star puntuacionDe${usuario}"></span>
        <span class="fa fa-star puntuacionDe${usuario}"></span>
        <span class="fa fa-star puntuacionDe${usuario}"></span>
        <span class="fa fa-star puntuacionDe${usuario}"></span>
    `;
    return estrellas;
}

// FUNCIÓN QUE "COLOREA" LAS ESTRELLAS SEGÚN EL PUNTAJE
function puntuacionColor(puntaje, usuario){
    // obtenemos un array de los spans particulares de cada usuario
    let puntuacionProducto = comentariosUsuarios.getElementsByClassName(`puntuacionDe${usuario}`);
    // vamos agregando la clase que colorea las estrellas al array de spans
    for(let i=0; i < puntaje; i++){
        puntuacionProducto[i].classList.add('checked');
    }
}