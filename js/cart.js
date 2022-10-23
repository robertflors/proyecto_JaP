const ID_USUARIO = localStorage.getItem('inicioSesionUsuarioID');
const URL_CARRITO = CART_INFO_URL + ID_USUARIO + EXT_TYPE;
const CARRITO_ARTICULOS = document.getElementById('carritoArticulos');
let carrito = [];
const carritoLocal = JSON.parse(localStorage.getItem('carrito'));
const eliminarCarrito = document.getElementById('eliminarArticulosCarrito');
const carritoSubtotal = document.getElementById('carritoSubtotal');
const carritoCostoEnvio = document.getElementById('carritoCostoEnvio');
const carritoTotal = document.getElementById('carritoTotal');
// inputs del forma de pago modal, para el atributo disable
const tarjetaCredito = document.getElementById('tarjetaCredito');
const tarjetaCampo = document.getElementById('formaDePagoCre');
const transferenciaBancaria = document.getElementById('transferenciaBancaria');
const transfeCampo = document.getElementById('formaDePagoTra');


fetch(URL_CARRITO).then(respuesta => respuesta.json()).then(datos => {
    // creamos un carrito que será la suma del que traemos de la URL con el carrito del localStorage de los productos que estamos agregando.
    carrito = datos.articles.concat(carritoLocal);
    // FOR EACH TEMPORAL PARA ELIMINAR EL ARTÍCULO POR DEFECTO QUE SE REPITE AL VOLVER A RENDERIZAR YA QUE NO PODEMOS ALTERAR LA API QUE USAMOS
    // -------------------------------------------------------------------------------------------
    if(carritoLocal.lenght > 0){
        carrito.forEach(function(art) {
            if (art.id === datos.articles[0].id) {
                carrito.shift();
            }
        });
    }  
    mostrarArticulos(carrito);
});
// función para convertir precio de los productos a dólares de ser necesario
function conversionDolares(currency, cost){
    let cambioActual = 40;
    let precioDolares = 0;

    if(currency === "UYU"){
        precioDolares = Math.round(cost/cambioActual);
        return precioDolares;
    }else{
        return cost;       
    }
}

function monedaCambio(currency){
    if(currency === "UYU"){
        return 'USD'
    }else{
        return currency;
    }  
 }

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
        <td>${monedaCambio(articulo.currency) + ' ' + conversionDolares(articulo.currency, articulo.unitCost)}</td>
        <td class="w-25"><input class="w-25 cantidadArticulo" min="1" type="number" value="${articulo.count}" id="cantidad${articulo.id}"></td>
        <td id="subtotal${articulo.id}" class="subtotalArticulo" data-subtotal-articulo="${conversionDolares(articulo.currency, articulo.unitCost)}"><strong>${monedaCambio(articulo.currency) + ' ' + articulo.count * conversionDolares(articulo.currency, articulo.unitCost)} </strong></td>
        <td class="text-center"><span class="material-symbols-outlined borrarArticulo" id="borrar${articulo.id}">delete</span></td>
      `;
        // creamos el nodo tr, le agregamos la información del producto y lo appendeamos al tb
        let filaArticulo = document.createElement('tr');
        filaArticulo.innerHTML = (articuloInfo);
        CARRITO_ARTICULOS.appendChild(filaArticulo);
        // a los inputs de la tabla le hacemos el evento "input" para que modifiquen el subtotal mostrado en la tabla
        document.getElementById(`cantidad${articulo.id}`).addEventListener('input', e => {
           let articuloSubtotal = document.getElementById(`subtotal${articulo.id}`);
            // seteamos el nuevo subtotal en el data del subtotal particular de cada artículo para luego usarlo luego en el cálculo del subtotal de la compra
           articuloSubtotal.dataset.subtotalArticulo = e.target.value * conversionDolares(articulo.currency, articulo.unitCost);
            // mostramos los cambios en la tabla
           articuloSubtotal.innerHTML = `<strong>${monedaCambio(articulo.currency) + ' ' + e.target.value * conversionDolares(articulo.currency, articulo.unitCost)}</strong>`;
           calcularSubtotalCompra();
        });
        // asociamos el delete de cada artículo a un evento para eliminarlo del carrito
        document.getElementById(`borrar${articulo.id}`).addEventListener('click', ()=>{
            carrito.splice(carrito.indexOf(articulo), 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarArticulos(carrito);        
        })
    }
    calcularSubtotalCompra();
}

// función para mostrar el subtotal de la compra
function calcularSubtotalCompra(){
    let arraySubtotales = document.getElementsByClassName('subtotalArticulo');
    let acumSub = 0;
    for(const subArt of arraySubtotales){
        acumSub += parseInt(subArt.dataset.subtotalArticulo);
    }
    carritoSubtotal.innerHTML = `USD ${acumSub}`;
    carritoCostoEnvio.innerHTML = `USD ${Math.round(calcularCostoEnvio() * acumSub)}`;
    carritoTotal.innerHTML = `USD ${acumSub + Math.round(calcularCostoEnvio() * acumSub)}`;    
}

// función para calcular el precio de envío según el subtotal del carrito
function calcularCostoEnvio(){
    let arrayRadios = document.getElementsByClassName('tipoDeEnvio');
     for (const radio of arrayRadios) {
        if(radio.checked){
            return parseFloat(radio.dataset.tipoEnvio);
        }   
     }
}
// para que los inputs radio tengan asociados al evento click la función para actualizar el total según el tipo de envío.
const radiosEnvio = document.getElementsByClassName('tipoDeEnvio');
for (const radio of radiosEnvio){
    radio.addEventListener('click', calcularSubtotalCompra); 
}

// para habilitar y desabilitar las formas de pago según sea el caso
tarjetaCredito.addEventListener('click', ()=>{
    tarjetaCampo.disabled = false;
    transfeCampo.disabled = true;    
});

transferenciaBancaria.addEventListener('click', ()=>{
    transfeCampo.disabled = false;
    tarjetaCampo.disabled = true;
});

// para validar que las formas de pago hayan sido completadas
const numTarjeta= document.getElementById('numTarjeta');
const numCVC= document.getElementById('numCVC');
const fechaVencimiento= document.getElementById('fechaVencimiento');
const numCuenta= document.getElementById('numCuenta');
const valPago = document.getElementById('validarFormaPago');
// alerta para la cantidad de los artículos
const alertaCantArt = document.getElementById('alertaCantidadArticulos');

document.getElementById('formularioCompra').addEventListener('submit', handleSubmit);

// función que tiene la lógica para que el submit se efectúe o no dependiendo de ciertas validaciones
function handleSubmit(e) {
      e.preventDefault();
    //   si el método de pago no está debidamente seleccionado y completado saltará la alerta
      if((!tarjetaCampo.disabled&&((numTarjeta.value == '')||
            (numCVC.value == '')||
            (fechaVencimiento.value == '')))
            ||(!transfeCampo.disabled&&numCuenta.value == '')){
                valPago.setAttribute('class', 'text-danger');               
    }else{
            valPago.setAttribute('class', 'd-none');
    }
    // para validar que todos los artículos tengan al menos "1" en cantidad
    let arrayCantidadesArticulos = [];
    // creamos un array con las cantidades de los articulos
    for (const cantidad of document.getElementsByClassName('cantidadArticulo')) {
        arrayCantidadesArticulos.push(cantidad.value);        
    }
    // hacemos un condicional con reduce donde se muestra el mensaje en caso que haya un error en las cantidades
    if(!arrayCantidadesArticulos.reduce((prev, curr)=> (prev > 0)&&(curr > 0), true)){
        alertaCantArt.setAttribute('class', 'alert alert-danger mb-2');       
    }else{
        alertaCantArt.setAttribute('class', 'd-none');
    }
// condicional en el que se evalúa cada uno de los campos obligatorios para mostrar el mensaje de compra satisfactoria
    if(!((!tarjetaCampo.disabled&&((numTarjeta.value == '')||
                                      (numCVC.value == '')||
                            (fechaVencimiento.value == '')))
        ||(!transfeCampo.disabled&&numCuenta.value == '')) &&
        
        (arrayCantidadesArticulos.reduce((prev, curr)=> (prev > 0)&&(curr > 0), true)) &&

        (document.getElementById('direccionCalle').value != '') &&

        (document.getElementById('direccionNumero').value != '') &&

        (document.getElementById('direccionEsquina').value != '')        
        ){
            document.getElementById('compraExitosa').setAttribute('class', 'alert alert-success')
            setTimeout(() => {
                borrarTodo();
                this.submit();
              }, 2500);           
        }
    }
// para eliminar todos los artículos del carrito menos el que viene de la API
eliminarCarrito.addEventListener('click', borrarTodo);

function borrarTodo(){
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify([]));
    mostrarArticulos([]);
}
