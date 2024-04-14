// Array para almacenar los objetos PedidoItem
let pedidoItems = [];



class PedidoItem {
    constructor(id, nombre, precio, cantidad) {
      this.id = id;
      this.nombre = nombre;
      this.precio = parseFloat(precio); // Convertir el precio a número flotante
      this.cantidad = parseInt(cantidad); // Convertir la cantidad a número entero
    }
  
    // Método para calcular el subtotal del ítem
    calcularSubtotal() {
      return this.precio * this.cantidad;
    }
  }

  function renderPedidoItem(){
    const itemPedidoElements = document.querySelector('.items-list');

    let contentHTML = '';
    let contador = 1;
    pedidoItems.forEach(item => {
        const id = item.id;
        const nombre = item.nombre;
        const precio = item.precio;
        const cantidad = item.cantidad;

        const itemHTML = `
        <div class="item-pedido" data-id="${id}">
            <div class="no-item">
              <h4>${contador}</h4>
            </div>
            <img src="./platos-imgs/${id}.png" alt="${nombre}">
            <div class="info-item">
              <h5>${nombre}</h5>
              <p class="precio">${precio}</p>
              <a class="detalles-enlace">Detalles</a>
            </div>
            <div class="btns-item">
              <div class="btns-cant">
                <button class="btn-cant menos"><span class="material-symbols-outlined btn-cant menos">remove</span></button>
                <input class="btn-cant-value" type="text" value="${cantidad}" disabled/>
                <button class="btn-cant mas"><span class="material-symbols-outlined btn-cant mas">add</span></button>
              </div>
              <button title="Eliminar del pedido" class="eliminar"><span class="material-symbols-outlined fig-eliminar">delete</span></button>
            </div>
        </div>
        `;
        contentHTML += itemHTML;
        contador++;
    });
    itemPedidoElements.innerHTML = contentHTML;
 
  }




document.addEventListener("DOMContentLoaded", function() {

    renderPedidoItem();

    

    // Menú pedido------------------------------------------
    btnCarrito = document.getElementById( "btn-carrito" );
    carritoDiv = document.getElementById( "pedido-container"); 
    btnClose = document.getElementById('btn-close');

    btnCarrito.addEventListener( 'click', function(){
        carritoDiv.style.right = "0";
        setTimeout (() => {
            carritoDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
        }, 400);   //
    });

    btnClose.addEventListener( 'click', function(){
        carritoDiv.style.backgroundColor = "rgba(0,0,0,0)";
        setTimeout (() => {
            carritoDiv.style.right = "-100%";
        }, 300);
        
    });
    // Fin Menú pedido------------------------------------------


    // Código botones cantidad ----------------------------------------
    const containerPedido = document.querySelector('.pedido-container');

    containerPedido.addEventListener('click', (event) => {
       
        if (event.target.matches('.btn-cant')) {
           
            const card = event.target.closest('.item-pedido');
            const quantityValue = card.querySelector('.btn-cant-value');
            const currentValue = parseInt(quantityValue.value);

            if (event.target.matches('.menos')) {
                if (currentValue > 1) {
                    quantityValue.value = currentValue - 1;
                } else {
                    quantityValue.value = 1;
                }
                pedidoItems.forEach(item => {
                    if (item.id === card.getAttribute('data-id')) {
                        item.cantidad = quantityValue.value;
                    }
                });
            } else if (event.target.matches('.mas')) {
                quantityValue.value = currentValue + 1;
                pedidoItems.forEach(item => {
                    if (item.id === card.getAttribute('data-id')) {
                        item.cantidad = quantityValue.value;
                    }
                });
            }
        } else if (
            event.target.matches('.eliminar') ||
            event.target.matches('.fig-eliminar')
        ){
            // Obtener el card que se está presionando
            const card = event.target.closest('.item-pedido');
            
            // Obtener el data-id, nombre y precio del card
            const id = card.getAttribute('data-id');
            pedidoItems = pedidoItems.filter(item => item.id !== id);
            renderPedidoItem();
            console.log(pedidoItems);
        }        
    });
    // Fin Código botones cantidad ----------------------------------------

    // Código añadir ----------------------------------------
    const containerCards = document.querySelector('.cards-container');

    containerCards.addEventListener('click', (event) => {
        if (event.target.matches('.btn-añadir-shoppingcar') ||
            event.target.matches('.fig-carrito')        
        ) {
            // Obtener el card que se está presionando
            const card = event.target.closest('.card-item');
            
            // Obtener el data-id, nombre y precio del card
            const id = card.getAttribute('data-id');
            const nombre = card.querySelector('#nombre-plato').innerText;
            const precio = card.querySelector('.precio').innerText;

                
            pedidoItems.find(item => item.id === id);        
            if(!pedidoItems.find(item => item.id === id)){
                newItemPedido = new PedidoItem(id, nombre, precio, 1);
                pedidoItems.push(newItemPedido);
                renderPedidoItem();
            }
        }
    });
    // Fin Código añadir ----------------------------------------


});