/* ===================================
        WAANG STORE JAVASCRIPT
        Carrito + Promos + WhatsApp
=================================== */


let carrito = [];





// ABRIR CARRITO

function abrirCarrito(){

    document
    .getElementById("carrito")
    .classList
    .add("activo");

}





// CERRAR CARRITO

function cerrarCarrito(){

    document
    .getElementById("carrito")
    .classList
    .remove("activo");

}






// AGREGAR PRODUCTO

function agregarProducto(nombre, tallaID){


    let talla =
    document
    .getElementById(tallaID)
    .value;



    let productoExistente =
    carrito.find(
        producto =>
        producto.nombre === nombre &&
        producto.talla === talla
    );



    if(productoExistente){

        productoExistente.cantidad++;

    }else{


        carrito.push({

            nombre:nombre,

            talla:talla,

            cantidad:1

        });


    }



    actualizarCarrito();


}







// MOSTRAR CARRITO


function actualizarCarrito(){


    let contenedor =
    document.getElementById("items");



    contenedor.innerHTML="";



    carrito.forEach((producto,index)=>{


        contenedor.innerHTML += `


        <div class="item">


        <b>${producto.nombre}</b>


        <br>


        Talla:
        ${producto.talla}


        <br><br>


        Cantidad:


        <button onclick="cambiarCantidad(${index},-1)">
        -
        </button>



        ${producto.cantidad}



        <button onclick="cambiarCantidad(${index},1)">
        +
        </button>



        <br><br>



        <button onclick="eliminarProducto(${index})">

        Eliminar

        </button>



        </div>


        `;


    });



    document
    .getElementById("contador")
    .innerHTML =
    carrito.reduce(
        (total,p)=>total+p.cantidad,
        0
    );



    calcularTotal();



}







// CAMBIAR CANTIDAD


function cambiarCantidad(index,cambio){


    carrito[index].cantidad += cambio;



    if(carrito[index].cantidad <=0){

        carrito.splice(index,1);

    }



    actualizarCarrito();


}







// ELIMINAR


function eliminarProducto(index){


    carrito.splice(index,1);


    actualizarCarrito();


}







// CALCULAR PROMOCION


function calcularProductos(){



    let cantidad =
    carrito.reduce(
        (total,p)=>total+p.cantidad,
        0
    );



    let total = 0;



    while(cantidad >=3){

        total +=2200;

        cantidad -=3;

    }



    if(cantidad===2){

        total +=1500;

    }


    if(cantidad===1){

        total +=1000;

    }



    return total;


}








// TOTAL FINAL


function calcularTotal(){



    let subtotal =
    calcularProductos();



    let envio =
    Number(
        document
        .getElementById("envio")
        .value
    );



    document
    .getElementById("subtotal")
    .innerHTML =
    subtotal;



    document
    .getElementById("costo-envio")
    .innerHTML =
    envio;



    document
    .getElementById("total")
    .innerHTML =
    subtotal + envio;



}







// ACTUALIZAR ENVIO


document
.getElementById("envio")
.addEventListener(
"change",
calcularTotal
);









// ENVIAR WHATSAPP


function enviarWhatsApp(){



    if(carrito.length===0){

        alert(
        "Debes agregar productos al carrito."
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





    if(nombre==="" || telefono===""){


        alert(
        "Completa nombre y teléfono."
        );


        return;


    }






    let metodoEnvio =

    document
    .getElementById("envio")
    .options[
    document
    .getElementById("envio")
    .selectedIndex
    ]
    .text;







    let productos="";



    carrito.forEach(producto=>{


        productos +=

`
👕 ${producto.nombre}

Talla: ${producto.talla}

Cantidad: ${producto.cantidad}


`;


    });







    let total =

    document
    .getElementById("total")
    .innerHTML;







let mensaje =

`
🖤 *NUEVO PEDIDO WAANG* 🖤


👤 Cliente:
${nombre}


📞 Teléfono:
${telefono}


📍 Dirección:
${direccion}


📌 Referencia:
${referencia}



🛍️ PRODUCTOS:


${productos}



🚚 Método de entrega:

${metodoEnvio}



💰 TOTAL:

RD$${total}



📅 Recordatorio:

Pedidos:
Lunes a Jueves

Elaboración:
Viernes y Sábado

Entregas:
Domingo



Gracias por comprar en WAANG 🤍

Instagram:
@waangrd

`;






let url =

"https://wa.me/18097084033?text="

+

encodeURIComponent(mensaje);





window.open(url,"_blank");



}
