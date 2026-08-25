const contenedorFavoritos =
    document.querySelector("#contenedor-favoritos");

let favoritos =
    JSON.parse(localStorage.getItem("favoritosChacNicte")) || [];

function mostrarFavoritos() {
    if (!contenedorFavoritos) {
        return;
    }

    contenedorFavoritos.innerHTML = "";

    const productosFavoritos = productos.filter(
        (producto) => favoritos.includes(producto.id)
    );

    if (productosFavoritos.length === 0) {
        contenedorFavoritos.classList.add("sin-favoritos");
        contenedorFavoritos.classList.remove("sin-favoritos");
        contenedorFavoritos.innerHTML = `
            <div class="favoritos-vacios">
                <div class="favoritos-vacios-icono">♡</div>

                <h2>Aún no tienes prendas favoritas</h2>

                <p>
                    Explora nuestra colección y guarda las piezas
                    que más te gusten.
                </p>

                <a
                    href="coleccion.html"
                    class="boton boton-principal"
                >
                    Explorar colección
                </a>
            </div>
        `;

        return;
    }

    productosFavoritos.forEach((producto) => {
        const tarjeta = document.createElement("article");

        tarjeta.className = "producto";

        tarjeta.innerHTML = `
            <div class="producto-imagen">

                <span class="etiqueta-artesanal">
                    Hecho a mano
                </span>

                <button
                    type="button"
                    class="boton-favorito activo"
                    data-id="${producto.id}"
                    aria-label="Quitar de favoritos"
                >
                    ♥
                </button>

                <img
                    src="../${producto.imagen}"
                    alt="${producto.categoria}"
                    loading="lazy"
                >

            </div>

            <div class="producto-informacion">

                <p class="producto-tecnica">
                    ${producto.tecnica}
                </p>

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
    class="boton-quitar"
    data-id="${producto.id}"
>
    💔 Quitar
</button>

                </div>

            </div>
        `;

        contenedorFavoritos.appendChild(tarjeta);
    });

    activarBotonesQuitar();
}
function activarBotonesFavoritos() {

    const botonesFavorito =
        document.querySelectorAll(".boton-favorito");

    botonesFavorito.forEach((boton) => {

        boton.addEventListener("click", () => {

            const idProducto =
                Number(boton.dataset.id);

            if (favoritos.includes(idProducto)) {

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

            mostrarProductos(productos);

        });

    });

}

function activarBotonesQuitar() {
    const botones =
    document.querySelectorAll(".boton-quitar");

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const idProducto = Number(boton.dataset.id);

            favoritos = favoritos.filter(
                (id) => id !== idProducto
            );

            localStorage.setItem(
                "favoritosChacNicte",
                JSON.stringify(favoritos)
            );

            mostrarFavoritos();
        });
    });
}

mostrarFavoritos();
activarBotonesFavoritos();