// LOCAL STORAGE
const ProductosEnCarritoLocal = JSON.parse(localStorage.getItem("ProductosEnCarrito"))
if(ProductosEnCarritoLocal) {
    carrito = ProductosEnCarritoLocal;
} else{
    carrito = []
}

// CREAMOS EL CARRITO
const carritoCompleto = () => {
    carritoCompras.innerHTML = " "
    carritoCompras.style.display = "flex"
    const tituloCarrito = document.createElement("div");
    tituloCarrito.innerHTML = `
        <h2 class="estiloTituloCarrito">Mi carrito</h2>
        `;
    tituloCarrito.classList.add("tituloCarrito");
    carritoCompras.append(tituloCarrito);


    // BOTON PARA CERRAR EL CARRITO
    const botonCarrito = document.createElement("h3");
    botonCarrito.innerText = "❌";
    botonCarrito.classList.add("botonCarrito");
    tituloCarrito.append(botonCarrito);
    botonCarrito.addEventListener("click", () => {
        carritoCompras.style.display = "none"
    })

    // CREAMOS ELEMENTOS DENTRO DEL CARRITO
    const carritoContenido = document.createElement("div");
    carritoContenido.classList.add("contenidoCarrito");
    carritoCompras.append(carritoContenido);

    carrito.forEach((producto) => {
        const itemCarrito = document.createElement("div");
        itemCarrito.classList.add("productoCarrito");
        itemCarrito.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="infoProducto">
                <h4>${producto.nombre}</h4>
                <h5>Cantidad: ${producto.cantidad}</h5>
                <p>Precio: $${producto.precio * producto.cantidad}</p>
            </div>
        `;
        carritoContenido.append(itemCarrito);


        // BOTON PARA BORRAR LOS PRODUCTOS DEL CARRITO
        const eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.classList.add("borrarProducto");
        itemCarrito.append(eliminar);
        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });
    })


// ACUMULADOR DE PRECIOS, TOTAL A PAGAR
    const total = carrito.reduce((acc, e) => acc + e.precio * e.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.classList.add("totalCompra");
    totalCompra.innerHTML = `Total a pagar: $${total}`;
    carritoCompras.append(totalCompra);
};

// ELIMINAR PRODUCTOS DEL CARRITO
const eliminarProducto = (id) => {
    const index = carrito.findIndex((producto) => producto.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        carritoCompleto();
        contadorCarrito();
    }
};


// NUMERO CONTADOR DE PRODUCTOS
const contadorCarrito = () => {
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = carrito.length;
}


// ALERTA CUANDO SE REALIZA LA COMPRA
document.addEventListener("DOMContentLoaded", () => {
    const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");
    botonFinalizarCompra.addEventListener("click", () => {
        Swal.fire({
            title: "Gracias por comprar en el club de la música!",
            confirmButtonText: "Finalizar",
        });
        carrito.length = 0;
        carritoCompleto();
        contadorCarrito();
    });
});

// REDIRECCION PARA FINALIZAR LA COMPRA
verCarrito.addEventListener("click", () => {
    carritoCompleto();
    const botonComprar = document.createElement("button");
    botonComprar.innerText = "Finalizar compra";
    botonComprar.classList.add("botonComprar");
    carritoCompras.append(botonComprar);

    botonComprar.addEventListener("click", () => {
        window.location.href = "checkout.html";
    });
});



