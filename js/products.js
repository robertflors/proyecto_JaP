const mostrarProductos = document.getElementById("mostrarProductosCategoria");
const categoriaSubtitulo = document.getElementById("categoriaProductoSubtitulo");

// Sacamos del localStorage el valor del id del div al cual se le hizo click
const PRODUCTOS_ID = localStorage.getItem("catID");

// buscamos la URL de la base de datos de la categoría seleccionada
const PRODUCTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/" + PRODUCTOS_ID + ".json";

// Función para mostrar la lista desplegada de productos de determinada categoría
function showProductsList (productos) { 
  
    for (const producto of productos) {
        mostrarProductos.innerHTML += `
            <div class="list-group-item list-group-item-action cursor-active">
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

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            categoriaSubtitulo.append(resultObj.data.catName); //para agregar el nombre al strong que hay en el subtítulo del products.html     
            showProductsList(resultObj.data.products);            
        }       
       
    });
}
);

