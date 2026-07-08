/* =================================
      WAANG STORE - JAVASCRIPT
   Carrito + Promociones + WhatsApp
================================= */


let carrito = [];



/* ABRIR CARRITO */

function abrirCarrito(){

    document
    .getElementById("carrito")
    .classList
    .toggle("activo");

}





/* AGREGAR PRODUCTO */

function agregarProducto(nombre, tallaID){


    let talla = document
    .getElementById(tallaID)
    .value;



    carrito.push({

        nombre:nombre,
        talla:talla,
        cantidad:1

    });


    actualizarCarrito();


}





/* ACTUALIZAR CARRITO */


function actualizarCarrito(){


    let contenedor =
    document.getElementById("items");


    contenedor.innerHTML="";


    carrito.forEach((producto,index)=>{


        contenedor.innerHTML += `

        <div class="item-carrito">

        <b>${producto.nombre}</b><br>

        Talla: ${producto.talla}<br>

        Cantidad: ${producto.cantidad}

        <br>

        <button onclick="eliminarProducto(${index})">
        Eliminar
        </button>


        </div>

        `;


    });



    document
    .getElementById("contador")
    .innerHTML =
    carrito.length;



    calcularTotal();


}





/* ELIMINAR PRODUCTO */


function eliminarProducto(index){


    carrito.splice(index,1);


    actualizarCarrito();


}







/* CALCULO DE PROMOCIONES */


function calcularProductos(){


    let cantidad = carrito.length;


    let total = 0;



    /*
       PROMOS

       1 = 1000
       2 = 1500
       3 = 2200

    */



    while(cantidad >= 3){

        total += 2200;

        cantidad -=3;

    }



    if(cantidad === 2){

        total +=1500;

    }


    else if(cantidad ===1){

        total +=1000;

    }



    return total;


}







/* TOTAL */


function calcularTotal(){


    let productos =
    calcularProductos();



    let envio =
    Number(
    document.getElementById("envio").value
    );



    document
    .getElementById("total")
    .innerHTML =
    productos + envio;



}







/* CAMBIAR ENVIO */


document
.getElementById("envio")
.addEventListener(
"change",
calcularTotal
);









/* ENVIAR PEDIDO WHATSAPP */


function enviarWhatsApp(){



    if(carrito.length===0){

        alert(
        "Agrega productos al carrito primero."
        );

        return;

    }



    let nombre =
    document
    .getElementById("nombre")
    .value;



    let telefono =
    document
    .getElementById("telefono")
    .value;



    let direccion =
    document
    .getElementById("direccion")
    .value;



    let referencia =
    document
    .getElementById("referencia")
    .value;



    let envioTexto =
    document
    .getElementById("envio")
    .options[
    document
    .getElementById("envio")
    .selectedIndex
    ]
    .text;




    let lista="";



    carrito.forEach(producto=>{


        lista +=
        `
👕 ${producto.nombre}
Talla: ${producto.talla}

`;

    });




    let total =
    document
    .getElementById("total")
    .innerHTML;





    let mensaje =

`🖤 NUEVO PEDIDO WAANG 🖤


👤 Cliente:
${nombre}


📞 Teléfono:
${telefono}


📍 Dirección:
${direccion}


📌 Referencia:
${referencia}



🛍️ PRODUCTOS:

${lista}



🚚 Método de entrega:

${envioTexto}



💰 TOTAL:

RD$${total}



Gracias por comprar en WAANG 🤍`;






    let url =

    "https://wa.me/18097084033?text="

    +
    encodeURIComponent(mensaje);



    window.open(url,"_blank");



}
