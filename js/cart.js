const ID_USUARIO = localStorage.getItem('inicioSesionUsuarioID');
const URL_CARRITO = CART_INFO_URL + ID_USUARIO + EXT_TYPE;
const CARRITO_ARTICULOS = document.getElementById('carritoArticulos');
let carrito = [];
const carritoLocal = JSON.parse(localStorage.getItem('carrito'));
const eliminarCarrito = document.getElementById('eliminarArticulosCarrito');
const carritoSubtotal = document.getElementById('carritoSubtotal');
const carritoCostoEnvio = document.getElementById('carritoCostoEnvio');
const carritoTotal = document.getElementById('carritoTotal');

fetch(URL_CARRITO).then(respuesta => respuesta.json()).then(datos => {
    carrito = datos.articles;
    // mostramos el carrito que traemos de la URL con el carrito del localStorage de los productos que estamos agregando.
    mostrarArticulos(carrito.concat(carritoLocal));
});

// función que agrega table rows al table body que está en el html cart
function mostrarArticulos(articulos) {
    CARRITO_ARTICULOS.innerHTML = '';
    carritoSubtotal.innerHTML = '';
    carritoCostoEnvio.innerHTML = '';
    carritoTotal.innerHTML = '';
    
    let articuloInfo = '';

    for (const articulo of articulos) {
        articuloInfo = `
        <th scope="row"><img src="${articulo.image}" style="width: 100px;"></th>
        <td>${articulo.name}</td>
        <td>${articulo.currency + ' ' + articulo.unitCost}</td>
        <td class="w-25"><input class="w-25" type="number" value="${articulo.count}" id="cantidad${articulo.id}"></td>
        <td id="subtotal${articulo.id}"><strong>${articulo.currency + ' ' + articulo.count * articulo.unitCost} </strong></td>
        <td class="text-center"><span class="material-symbols-outlined">delete</span></td>
      `;
        // creamos el nodo tr, le agregamos la información del producto y lo appendeamos al tb
        let filaArticulo = document.createElement('tr');
        filaArticulo.innerHTML = (articuloInfo);
        CARRITO_ARTICULOS.appendChild(filaArticulo);
        // a los inputs de la tabla le hacemos el evento "input" para que modifiquen el subtotal mostrado en la tabla
        document.getElementById(`cantidad${articulo.id}`).addEventListener('input', e => {
            document.getElementById(`subtotal${articulo.id}`).innerHTML = `<strong>${articulo.currency + ' ' + e.target.value * articulo.unitCost} </strong>`;
        });        
    }
}

eliminarCarrito.addEventListener('click', ()=>{
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify([]));
    mostrarArticulos(carrito);
});
