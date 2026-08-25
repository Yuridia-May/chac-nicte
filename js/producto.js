
const parametros = new URLSearchParams(window.location.search);
const idProducto = Number(parametros.get("id"));

const productoActual = productos.find(
    producto => producto.id === idProducto
);

let tallaSeleccionada = "";
let colorSeleccionado = "";

if (productoActual) {

    document.getElementById("producto-nombre").textContent =
        productoActual.nombre;

    document.getElementById("producto-precio").textContent =
        `$${productoActual.precio.toLocaleString("es-MX")} MXN`;

    document.getElementById("producto-descripcion").textContent =
        productoActual.descripcion;

    document.getElementById("producto-imagen").src =
        `../${productoActual.imagen}`;

    document.getElementById("producto-material").textContent =
        productoActual.material;

    document.getElementById("producto-tecnica").textContent =
        productoActual.tecnica;

    document.getElementById("producto-tiempo").textContent =
        productoActual.tiempo;

    document.getElementById("producto-artesana").textContent =
        productoActual.artesana;

        const contenedorTallas = document.getElementById("producto-tallas");

contenedorTallas.innerHTML = "";

productoActual.tallas.forEach((talla) => {
    const boton = document.createElement("button");
    boton.textContent = talla;

    boton.addEventListener("click", () => {
        contenedorTallas.querySelectorAll("button").forEach((btn) => {
            btn.classList.remove("seleccionada");
        });

        boton.classList.add("seleccionada");
        tallaSeleccionada = talla;
    });

    contenedorTallas.appendChild(boton);
});

const contenedorColores = document.getElementById("producto-colores");

contenedorColores.innerHTML = "";

productoActual.colores.forEach((color) => {
    const circulo = document.createElement("span");

    circulo.classList.add(color.toLowerCase());

    circulo.title = color;

    circulo.addEventListener("click", () => {
        contenedorColores.querySelectorAll("span").forEach((opcion) => {
            opcion.classList.remove("color-seleccionado");
        });

        circulo.classList.add("color-seleccionado");
        colorSeleccionado = color;
    });

    contenedorColores.appendChild(circulo);
});
if (productoActual.coloresPedido === true) {
    const contenedorMensaje =
        document.getElementById("mensaje-color-pedido");

    contenedorMensaje.innerHTML = "";

    const mensajePedido = document.createElement("p");

    mensajePedido.classList.add("mensaje-color-pedido");

    mensajePedido.textContent =
        "🌸 ¿Te gustaría esta prenda en otro color? Consulta con la artesana la posibilidad de elaborarla sobre pedido.";

    contenedorMensaje.appendChild(mensajePedido);
}}
// Imagen principal y miniaturas
const imagenPrincipal = document.querySelector(".imagen-principal");
const miniaturas = document.querySelectorAll(".miniaturas img");

// Botón del carrito
const botonCarrito = document.querySelector(".carrito");

miniaturas.forEach((miniatura) => {
    miniatura.addEventListener("click", () => {

        const idMiniatura = miniatura.dataset.id;

        window.location.href = `producto.html?id=${idMiniatura}`;

    });
});

botonCarrito.addEventListener("click", () => {
    if (!tallaSeleccionada) {
        alert("Selecciona una talla antes de continuar.");
        return;
    }

    if (!colorSeleccionado) {
        alert("Selecciona un color antes de continuar.");
        return;
    }

   const producto = {
    ...productoActual,
    talla: tallaSeleccionada,
    color: colorSeleccionado,
    cantidad: 1
};

    const carrito =
        JSON.parse(localStorage.getItem("carritoChacNicte")) || [];

const productoExistente = carrito.find(
    (item) =>
        item.id === producto.id &&
        item.talla === producto.talla &&
        item.color === producto.color
);

if (productoExistente) {
    productoExistente.cantidad += 1;
} else {
    carrito.push(producto);
}
    localStorage.setItem(
        "carritoChacNicte",
        JSON.stringify(carrito)
    );

    alert("Producto agregado correctamente al carrito.");
});
