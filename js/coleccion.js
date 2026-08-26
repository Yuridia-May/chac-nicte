const contenedor =
    document.getElementById("contenedor-productos");

const botonCarritoPrincipal =
    document.querySelector(".carrito");

let carrito =
    JSON.parse(localStorage.getItem("carritoChacNicte")) || [];

let favoritos =
    JSON.parse(localStorage.getItem("favoritosChacNicte")) || [];


/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function mostrarProductos(listaProductos) {

    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <div class="producto-imagen">

                <button
                    type="button"
                    class="boton-favorito ${
                        favoritos.includes(producto.id)
                            ? "activo"
                            : ""
                    }"
                    data-id="${producto.id}"
                    aria-label="${
                        favoritos.includes(producto.id)
                            ? "Quitar de favoritos"
                            : "Agregar a favoritos"
                    }"
                >
                    ${
                        favoritos.includes(producto.id)
                            ? "♥"
                            : "♡"
                    }
                </button>

                <span class="etiqueta-artesanal">
                    Hecho a mano
                </span>

                <img
                    src="../${producto.imagen}"
                    alt="${producto.nombre}"
                    loading="lazy"
                >

            </div>

            <div class="producto-informacion">

                <p class="producto-tecnica">
                    🧵 ${producto.tecnica}
                </p>

                <h3>
                    ${producto.nombre}
                </h3>

                <span class="precio">
                    $${producto.precio.toLocaleString("es-MX")} MXN
                </span>

                <div class="producto-acciones">

                    <a
                        href="producto.html?id=${producto.id}"
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

        contenedor.appendChild(tarjeta);

    });

    activarBotonesFavoritos();
    activarBotonesAgregar();
}

function activarFiltros() {

    const botonesFiltro =
        document.querySelectorAll(".filtros-catalogo button");

    botonesFiltro.forEach(boton => {

        boton.addEventListener("click", () => {

            const categoriaSeleccionada =
                boton.dataset.categoria;

            botonesFiltro.forEach(otroBoton => {
                otroBoton.classList.remove("filtro-activo");
            });

            boton.classList.add("filtro-activo");

            if (categoriaSeleccionada === "Todos") {

                mostrarProductos(productos);
                return;
            }

            const productosFiltrados =
                productos.filter(
                    producto =>
                        producto.categoria === categoriaSeleccionada
                );

            mostrarProductos(productosFiltrados);

        });

    });

}

/* =========================================
   FAVORITOS
========================================= */

function activarBotonesFavoritos() {

    const botonesFavorito =
        document.querySelectorAll(".boton-favorito");

    botonesFavorito.forEach(boton => {

        boton.addEventListener("click", () => {

            const idProducto =
                Number(boton.dataset.id);

            if (favoritos.includes(idProducto)) {

                favoritos = favoritos.filter(
                    id => id !== idProducto
                );

            } else {

                favoritos.push(idProducto);

            }

            localStorage.setItem(
                "favoritosChacNicte",
                JSON.stringify(favoritos)
            );

            mostrarProductos(productos);

        });

    });

}
function activarBotonesAgregar() {

    const botonesAgregar =
        document.querySelectorAll(".boton-agregar");

    botonesAgregar.forEach(boton => {

        boton.addEventListener("click", () => {

            const idProducto = Number(boton.dataset.id);

            const productoSeleccionado =
                productos.find(producto => producto.id === idProducto);

            if (!productoSeleccionado) return;

            const productoEnCarrito =
                carrito.find(producto => producto.id === idProducto);

            if (productoEnCarrito) {

                productoEnCarrito.cantidad =
                    (productoEnCarrito.cantidad || 1) + 1;

            } else {

                carrito.push({
                    ...productoSeleccionado,
                    cantidad: 1
                });

            }

            localStorage.setItem(
                "carritoChacNicte",
                JSON.stringify(carrito)
            );

            actualizarContadorCarrito();

        });

    });

}
function actualizarContadorCarrito() {

    if (!botonCarritoPrincipal) {
        return;
    }

    const cantidadTotal =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );

    botonCarritoPrincipal.textContent =
        `🛒 Carrito (${cantidadTotal})`;
}


/* =========================================
   INICIAR
========================================= */

mostrarProductos(productos);
actualizarContadorCarrito();
activarFiltros();