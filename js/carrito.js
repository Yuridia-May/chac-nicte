const contenedorCarrito = document.getElementById("contenedor-carrito");

const carrito =
    JSON.parse(localStorage.getItem("carritoChacNicte")) || [];

console.log("Productos guardados en el carrito:", carrito);

function mostrarCarrito() {

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <p>Tu carrito está vacío 🌸</p>
        `;
        return;
    }

    contenedorCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {

        const productoCarrito = document.createElement("div");

        productoCarrito.classList.add("producto-carrito");

        productoCarrito.innerHTML = `
    <img
        src="../${producto.imagen}"
        alt="${producto.nombre}"
        class="imagen-carrito"
    >

    <div class="datos-carrito">

        <h3>${producto.nombre}</h3>

        <p>
    <strong>Talla:</strong>
    ${producto.talla}
</p>

<p>
    <strong>Color:</strong>
    ${producto.color}
</p>

<div class="cantidad-carrito">
    <strong>Cantidad:</strong>

    <button
        class="boton-cantidad"
        onclick="disminuirCantidad(${index})"
    >
        −
    </button>

    <span>${producto.cantidad}</span>

    <button
        class="boton-cantidad"
        onclick="aumentarCantidad(${index})"
    >
        +
    </button>
</div>

<p class="precio-carrito">
    Precio: $${producto.precio.toLocaleString("es-MX")} MXN
</p>

<p class="subtotal-carrito">
    Subtotal:
    $${(producto.precio * producto.cantidad).toLocaleString("es-MX")} MXN
</p>

<button
    class="boton-eliminar"
    onclick="eliminarProducto(${index})"
>
    🗑 Eliminar
</button>

    </div>
`;

        contenedorCarrito.appendChild(productoCarrito);
    });
}
function aumentarCantidad(index) {
    carrito[index].cantidad++;
    guardarCarrito();
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        guardarCarrito();
    }
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    guardarCarrito();
}

function guardarCarrito() {
    localStorage.setItem(
        "carritoChacNicte",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
    mostrarResumen();
}

function mostrarResumen() {
    const resumen = document.getElementById("resumen-carrito");

    if (carrito.length === 0) {
        resumen.innerHTML = "";
        return;
    }

    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    const totalCompra = carrito.reduce(
        (total, producto) =>
            total + producto.precio * producto.cantidad,
        0
    );

    resumen.innerHTML = `
    <h3>Resumen de compra</h3>

    <div class="fila-resumen">
        <span>Productos</span>
        <span>${cantidadTotal}</span>
    </div>

    <div class="fila-resumen total-resumen">
        <span>Total</span>
        <span>$${totalCompra.toLocaleString("es-MX")} MXN</span>
    </div>

    <div class="acciones-resumen">
        <a
    href="pedido.html"
    class="btn-finalizar"
>
    Finalizar compra
</a>

        <a href="coleccion.html" class="btn-seguir-comprando">
            ← Seguir comprando
        </a>
    </div>
`;
}
mostrarCarrito();
mostrarResumen();
