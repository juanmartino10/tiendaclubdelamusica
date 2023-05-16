const contenedor = document.getElementById("contenedorProductos");
const verCarrito = document.getElementById("verCarrito");
const carritoCompras = document.getElementById("contenedorCarrito");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const boton = document.getElementById("botonFinalizarCompra")

productos.forEach(producto => {
    const contenido = document.createElement("div");
    contenido.classList.add("estiloProductos");
    contenido.innerHTML = `<img class="imagenProducto" src="${producto.imagen}" alt="${producto.nombre}">
    <h3 class="tituloProductos">${producto.nombre}</h3>
    <p class="precioProductos">$${producto.precio}</p>`;
    contenedor.append(contenido);

    const agregarCarrito = document.createElement("button");
    agregarCarrito.classList.add("botonAgregar");
    agregarCarrito.innerText = "Agregar al carrito"
    contenido.append(agregarCarrito)

    agregarCarrito.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id);
        if (repeat === true) {
            carrito.forEach((prod) => {
                if (prod.id === producto.id) {
                    prod.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                img: producto.imagen,
                precio: producto.precio,
                cantidad: producto.cantidad,
            });
        }
        contadorCarrito()
        localStorage.setItem("ProductosEnCarrito", JSON.stringify(carrito))
    });

})















