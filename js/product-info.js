const URL_CON_ID = PRODUCT_INFO_URL + localStorage.getItem('productoInfoID') + EXT_TYPE;
const URL_COMENTARIOS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('productoInfoID') + EXT_TYPE;
const contenedorProducto = document.getElementById('productoInfoDetallada');
const tituloProducto = document.getElementById('tituloProductoInfo');
const comentariosUsuarios = document.getElementById('productoComentariosDesplegados');
const mostrarComentarios = document.getElementById('mostrarComentarios');
const contenedorProducRela = document.getElementById('productosRelacionados');
let comentarios;
const formularioParaComentar = document.getElementById('comentarProducto');
const formularioComentario = document.getElementById('nuevoComentario');
const formularioPuntuacion = document.getElementById('nuevaPuntuacion');


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(URL_CON_ID).then(function (resultObj) {
        if (resultObj.status === "ok") {
            tituloProducto.append(resultObj.data.name);
            showProductsInfo(resultObj.data);
            showProductosRelacionados(resultObj.data.relatedProducts);    
        }
    });

    getJSONData(URL_COMENTARIOS).then(function (resultObj) {
        if (resultObj.status === "ok") {           
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
        <div class="container d-flex justify-content-center">
          ${arrayImagenes(data.images)}
        </div>
      </li>
    </ul>
  </div>`
}

// función que itera el array de imágenes del producto y retorna un string de DIVS
function arrayImagenes(imagenes) {       
   let grupoDivsImg = `
   <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="${imagenes[0]}" class="d-block">
      </div>
      <div class="carousel-item">
        <img src="${imagenes[1]}" class="d-block">
      </div>
      <div class="carousel-item">
        <img src="${imagenes[2]}" class="d-block">
      </div>
      <div class="carousel-item">
        <img src="${imagenes[3]}" class="d-block">
      </div>           
    </div>    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>`

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

// FUNCIÓN PARA GENERAR UN NUEVO COMENTARIO EN NUESTRA LISTA DE COMENTARIOS
function nuevaCalificacion(e){
  e.preventDefault();
  // para capturar la fecha en la que fue hecha el comentario
  let fecha = new Date(Date.now());
  let fechaComentario = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
  // buscamos el nombre del usuario actual en la página
  let usuario = localStorage.getItem('usuario');
  // verificamos que el usuario haya llenado al menos el score del producto para poder calificar
  if(formularioPuntuacion.value !== 'tu puntuación'){
    // condicional con la función que retorna true si el usuario no ha hecho calificaciones aún
    if(comentarioRepetido(usuario)){
      // creamos el nuevo objeto para pushear a la lista de comentarios
      comentarios.push({
        dateTime: fechaComentario,
        description: formularioComentario.value,
        score: parseInt(formularioPuntuacion.value),
        user: usuario
      });
      showProductsComents(comentarios); 
      // vaciamos los inputs luego de subido el comentario
      formularioComentario.value = '';
      formularioPuntuacion.value = 'tu puntuación';
    } else {

      alert('ya calificaste este producto');
      // vaciamos los inputs luego de subido el comentario
      formularioComentario.value = '';
      formularioPuntuacion.value = 'tu puntuación';
    }

  }else{
    alert('seleccionar el puntaje para poder calificar');
  }   
}

// FUNCIÓN PARA VERIFICAR QUE NO SE REPITAN COMENTARIOS DEL MISMO USUARIO
function comentarioRepetido(user){
  let usuariosQueComentaron = [];
  // llenamos el nuevo array con los nombres de los usuarios
   for(const comentario of comentarios){
    usuariosQueComentaron.push(comentario.user);
   }
  // para verificar si está o no incluido el usuario en la lista de usuarios que comentaron
   return usuariosQueComentaron.indexOf(user) === -1;
}

// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS RELACIONADOS AL PRODUCTO ACTUAL.
function showProductosRelacionados (relacionados) {
  let grupoDivs = '';
    for (const producto of relacionados){
        grupoDivs += `<div class="container shadow-sm p-3 mb-5 mt-5 bg-body rounded w-25 cursor-active" onclick="productoInfo(${producto.id})">
                          <img class="w-100" src="${producto.image}">
                          <p class="mt-3 text-center">${producto.name}</p>
                      </div>`;
    }
    contenedorProducRela.innerHTML = grupoDivs;
}
// para redirigir a la página del producto relacionado al seleccionarlo
function productoInfo(ID){
  // seteamos el id en el localStorage y redirigimos a productos info
  localStorage.removeItem('productoInfoID');
  localStorage.setItem('productoInfoID', ID);
  window.location.href = "product-info.html";
}

// EVENTO PARA MOSTRAR LOS COMENTARIOS
mostrarComentarios.addEventListener('click', ()=> showProductsComents(comentarios));
// EVENTO PARA SUBIR LAS NUEVAS CALIFICACIONES
formularioParaComentar.addEventListener('submit', nuevaCalificacion);