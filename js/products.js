const mostrarProductos = document.getElementById("mostrarProductosCategoria");
const categoriaSubtitulo = document.getElementById("categoriaProductoSubtitulo");

// Sacamos del localStorage el valor del id del div al cual se le hizo click
const PRODUCTOS_ID = localStorage.getItem("catID");

// buscamos la URL de la base de datos de la categoría seleccionada
const PRODUCTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/" + PRODUCTOS_ID + ".json";

// Función para mostrar la lista desplegada de productos de determinada categoría
function showProductsList(productos) {
    // vaciamos el div que muestra los productos antes de llenarlo con la nueva info.
    mostrarProductos.innerHTML = '';

    for (const producto of productos) {
        mostrarProductos.innerHTML += `
            <div class="list-group-item list-group-item-action cursor-active" id="${producto.id}" onclick="productoInfo(${producto.id})"> 
                <div class="row">
                    <div class="col-3">
                        <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost}</h4>
                            <small class="text-muted">${producto.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${producto.description}</p>
                    </div>
                </div>
            </div>
            `;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTOS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriaSubtitulo.append(resultObj.data.catName); //para agregar el nombre al strong que hay en el subtítulo del products.html     
            showProductsList(resultObj.data.products);
            // seteamos en el local storage el arreglo que sacamos de la promesa para usarlo más adelante  
            localStorage.removeItem('listaProductos');
            localStorage.setItem('listaProductos', JSON.stringify(resultObj.data.products));
            //llenamos la variable global con los datos del json, para usarla en otro momento
            arrayProductos = resultObj.data.products;
        }
    });
});

// ---------------------------------------FILTROS PARA PRODUCTOS--------------------------------------
// ---------------------------------------------------------------------------------------------------

const precioAsc = document.getElementById('sortAscPrecio');
const precioDes = document.getElementById('sortDesPrecio');
const relevancia = document.getElementById('sortRelevancia');
const rangoPrecioMin = document.getElementById('filterRangoPrecioMin');
const rangoPrecioMax = document.getElementById('filterRangoPrecioMax');
const botonRangoPrecio = document.getElementById('filterRangoPrecio');
const limpiarFiltroRango = document.getElementById('limpiarRangoPrecio');
const barraBusqueda = document.getElementById('barraBusqueda');
let arrayProductos = [];

function ordenarProductos(e) {
    // obtenemos el ID del input que está disparando el evento para luego hacer los condicionales
    let orden = e.currentTarget.id;
    // array que tendrá el valor de la lista de productos actual
    let productoOrdenado = JSON.parse(localStorage.getItem('listaProductos'));
    // los condicionales según el ID
    if (orden === 'sortAscPrecio') {
        showProductsList(productoOrdenado.sort((a, b) => a.cost - b.cost));
    } else if (orden === 'sortDesPrecio') {
        showProductsList(productoOrdenado.sort((a, b) => b.cost - a.cost));
    } else if (orden === 'sortRelevancia') {
        showProductsList(productoOrdenado.sort((a, b) => b.soldCount - a.soldCount));
    }
}

function filtrarProductos() {
    //creamos una variable que será el array de productos filtrados con los rangos de precios ingresados en los imputs
    let productosFiltrados = [];
    // si alguno de los campos de los inputs está vacío, no hace nada
    if ((rangoPrecioMin.value !== '') && (rangoPrecioMax.value !== '')) {
        productosFiltrados = arrayProductos. //salto de línea para mejor lectura
        filter(producto => producto.cost >= parseInt(rangoPrecioMin.value) && producto.cost <= parseInt(rangoPrecioMax.value));
        showProductsList(productosFiltrados);
        // seteamos el array filtrado para poder ordenarlos según sea el caso
        localStorage.setItem('listaProductos', JSON.stringify(productosFiltrados));
    } else if ((rangoPrecioMin.value !== '') || (rangoPrecioMax.value !== '')){
        productosFiltrados = arrayProductos. //salto de línea para mejor lectura
        filter(producto => producto.cost >= parseInt(rangoPrecioMin.value) || producto.cost <= parseInt(rangoPrecioMax.value));
        showProductsList(productosFiltrados);
        // seteamos el array filtrado para poder ordenarlos según sea el caso
        localStorage.setItem('listaProductos', JSON.stringify(productosFiltrados));
    }
}

function busquedaFiltro() {
    let busqueda = barraBusqueda.value.toLowerCase(); // lo que el usuario ingresa en la barra de búsqueda
    let productosBarraBusqueda = [];

    for (const producto of JSON.parse(localStorage.getItem('listaProductos'))) {
        // obtener los nombres y descripciones de cada producto y pasarlos a minúscula
        nombre = producto.name.toLowerCase();
        descripcion = producto.description.toLowerCase();
        // Condicional que, con ayuda de indexOf compara lo que el usuario escribe en la barra, con la cadena de caracteres que sacamos de los productos;
        //  y en caso que esté contenido, agrega el producto a un nuevo array que pasará por nuestro render de productos
        if ((nombre.indexOf(busqueda) !== -1) || (descripcion.indexOf(busqueda) !== -1)) {
            productosBarraBusqueda.push(producto);
        }
    }
    showProductsList(productosBarraBusqueda);
}

precioAsc.addEventListener('click', ordenarProductos);
precioDes.addEventListener('click', ordenarProductos);
relevancia.addEventListener('click', ordenarProductos);
botonRangoPrecio.addEventListener('click', filtrarProductos);
// botón en forma de enlace que reinicia los filtros mostrando el array de productos originales
limpiarFiltroRango.addEventListener('click', () => {
    localStorage.setItem('listaProductos', JSON.stringify(arrayProductos));
    showProductsList(arrayProductos);
});

// ------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------MOSTRAR INFO PRODUCTO-----------------------------------------------------------------------------
function productoInfo(ID){
    // seteamos el id en el localStorage y redirigimos a productos info
    localStorage.removeItem('productoInfoID');
    localStorage.setItem('productoInfoID', ID);
    window.location.href = "product-info.html";
}