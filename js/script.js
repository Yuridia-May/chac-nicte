const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCarritoPrincipal = document.querySelector("header .carrito");

let carrito =
    JSON.parse(localStorage.getItem("carritoChacNicte")) || [];

let favoritos =
    JSON.parse(localStorage.getItem("favoritosChacNicte")) || [];

function mostrarProductos(listaProductos = productos) {
    if (!contenedorProductos) {
        console.error(
            'No se encontró el elemento con id="contenedor-productos".'
        );
        return;
    }

    contenedorProductos.innerHTML = "";

    listaProductos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        activarBotonesAgregar();
        tarjeta.className = "producto";

        tarjeta.innerHTML = `
          <div class="producto-imagen">

    <span class="etiqueta-artesanal">
        Hecho a mano
    </span>

    <button
    type="button"
    class="boton-favorito ${
        favoritos.includes(producto.id) ? "activo" : ""
    }"
    data-id="${producto.id}"
    aria-label="${
        favoritos.includes(producto.id)
            ? "Quitar de favoritos"
            : "Agregar a favoritos"
    }"
>
    ${favoritos.includes(producto.id) ? "♥" : "♡"}
</button>
    </button>

    <img
        src="${producto.imagen}"
        alt="${producto.categoria}"
        loading="lazy"
    >

</div>
            <div class="producto-informacion">
               

                <p class="producto-tecnica">
                    🧵 ${producto.tecnica}
                </p>

        

                <span class="precio">
                    $${producto.precio.toLocaleString("es-MX")} MXN
                </span>

                <div class="producto-acciones">
                    <a
                        href="paginas/producto.html?id=${producto.id}"
                        class="boton-detalles"
                    >
                        Ver detalles
                    </a>

                    <button
                        type="button"
                        class="boton-agregar"
                        data-id="${producto.id}"
                    >
                        🛒 Agregar
                    </button>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(tarjeta);
    });


   activarBotonesAgregar();
activarBotonesFavoritos();
}
function activarBotonesFavoritos() {
    const botonesFavorito =
        document.querySelectorAll(".boton-favorito");

    botonesFavorito.forEach((boton) => {
        boton.addEventListener("click", () => {
            const idProducto = Number(boton.dataset.id);

            cambiarFavorito(idProducto);
        });
    });
}

function cambiarFavorito(idProducto) {
    const yaEsFavorito = favoritos.includes(idProducto);

    if (yaEsFavorito) {
        favoritos = favoritos.filter(
            (id) => id !== idProducto
        );
    } else {
        favoritos.push(idProducto);
    }

    localStorage.setItem(
        "favoritosChacNicte",
        JSON.stringify(favoritos)
    );

    mostrarProductos();
    function activarBotonesAgregar() {
    const botonesAgregar =
        document.querySelectorAll(".boton-agregar");

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const idProducto = Number(boton.dataset.id);

            agregarAlCarrito(idProducto);
        });
    });
}

function agregarAlCarrito(idProducto) {
    const productoSeleccionado =
        productos.find(
            (producto) => producto.id === idProducto
        );

    if (!productoSeleccionado) {
        return;
    }

    const productoExistente =
        carrito.find(
            (producto) => producto.id === idProducto
        );

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            ...productoSeleccionado,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarContadorCarrito();
}

function guardarCarrito() {
    localStorage.setItem(
        "carritoChacNicte",
        JSON.stringify(carrito)
    );
}

function actualizarContadorCarrito() {
    if (!botonCarritoPrincipal) {
        return;
    }

    const cantidadTotal = carrito.reduce(
        (total, producto) =>
            total + producto.cantidad,
        0
    );

    botonCarritoPrincipal.textContent =
        `🛒 Carrito (${cantidadTotal})`;
}
}


function activarBotonesAgregar() {
    const botonesAgregar =
        document.querySelectorAll(".boton-agregar");

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const idProducto = Number(boton.dataset.id);

            agregarAlCarrito(idProducto);
        });
    });
}

function agregarAlCarrito(idProducto) {
    const productoSeleccionado =
        productos.find((producto) => producto.id === idProducto);

    if (!productoSeleccionado) {
        return;
    }

    const productoExistente =
        carrito.find((producto) => producto.id === idProducto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            ...productoSeleccionado,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion(
        `${productoSeleccionado.nombre} se agregó al carrito`
    );
}

function guardarCarrito() {
    localStorage.setItem(
        "carritoChacNicte",
        JSON.stringify(carrito)
    );
}

function actualizarContadorCarrito() {
    if (!botonCarritoPrincipal) {
        return;
    }

    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    botonCarritoPrincipal.textContent =
        `🛒 Carrito (${cantidadTotal})`;
}

function mostrarNotificacion(mensaje) {
    const notificacionAnterior =
        document.querySelector(".notificacion");

    if (notificacionAnterior) {
        notificacionAnterior.remove();
    }

    const notificacion = document.createElement("div");

    notificacion.className = "notificacion";
    notificacion.setAttribute("role", "status");
    notificacion.textContent = `✓ ${mensaje}`;

    document.body.appendChild(notificacion);

    requestAnimationFrame(() => {
        notificacion.classList.add("notificacion-visible");
    });

    setTimeout(() => {
        notificacion.classList.remove("notificacion-visible");

        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 2500);
}

const botonesFiltro =
    document.querySelectorAll(".filtros-catalogo button");

botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
        const categoriaSeleccionada = boton.dataset.categoria;

        botonesFiltro.forEach((otroBoton) => {
            otroBoton.classList.remove("filtro-activo");
        });

        boton.classList.add("filtro-activo");

        if (categoriaSeleccionada === "Todos") {
            mostrarProductos(productos);
            return;
        }

        const productosFiltrados = productos.filter(
            (producto) =>
                producto.categoria === categoriaSeleccionada
        );

        mostrarProductos(productosFiltrados);
    });
});

mostrarProductos();


function actualizarContadorCarrito() {
    const carrito =
        JSON.parse(localStorage.getItem("carritoChacNicte")) || [];

    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );
console.log("Cantidad del carrito:", cantidadTotal);
    const contador = document.getElementById("contador-carrito");

    if (contador) {
        contador.textContent = `🛒 Carrito (${cantidadTotal})`;
    }
}
console.log("script.js llegó hasta el contador");
actualizarContadorCarrito();