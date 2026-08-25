
const carrito =
    JSON.parse(localStorage.getItem("carritoChacNicte")) || [];

const botonConfirmar = document.querySelector(".btn-confirmar-pedido");

const listaResumen =
    document.getElementById("lista-resumen-pedido");

const totalPedido =
    document.getElementById("total-pedido");


function mostrarResumenPedido() {

    listaResumen.innerHTML = "";

    let total = 0;

    carrito.forEach((producto) => {

        const subtotal =
            producto.precio * producto.cantidad;

        total += subtotal;

        const item =
            document.createElement("div");

        item.classList.add("producto-resumen");

        item.innerHTML = `
            <div>
                <strong>${producto.nombre}</strong>

                <p>
                    ${producto.talla} ·
                    ${producto.color} ·
                    Cantidad ${producto.cantidad}
                </p>
            </div>

            <span>
                $${subtotal.toLocaleString("es-MX")} MXN
            </span>
        `;

        listaResumen.appendChild(item);
    });

    totalPedido.textContent =
        `$${total.toLocaleString("es-MX")} MXN`;
}


mostrarResumenPedido();

const opcionesEntrega =
    document.querySelectorAll('input[name="entrega"]');

const datosEnvio =
    document.getElementById("datos-envio");

opcionesEntrega.forEach((opcion) => {

    opcion.addEventListener("change", () => {

        if (opcion.value === "envio" && opcion.checked) {
            datosEnvio.classList.add("activo");
        } else {
            datosEnvio.classList.remove("activo");
        }

    });

});

botonConfirmar.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    const entregaSeleccionada = document.querySelector(
        'input[name="entrega"]:checked'
    );

    if (nombre === "" || telefono === "") {
        alert("Por favor completa tu nombre y teléfono / WhatsApp.");
        return;
    }

    if (!entregaSeleccionada) {
        alert("Selecciona una forma de entrega.");
        return;
    }
let datosEnvioTexto = "";

if (entregaSeleccionada.value === "envio") {

    const estado =
        document.getElementById("estado").value.trim();

    const municipio =
        document.getElementById("municipio").value.trim();

    const codigoPostal =
        document.getElementById("codigo-postal").value.trim();

    const direccion =
        document.getElementById("direccion").value.trim();

    const referencias =
        document.getElementById("referencias").value.trim();


    if (
        estado === "" ||
        municipio === "" ||
        codigoPostal === "" ||
        direccion === ""
    ) {
        alert("Por favor completa los datos necesarios para el envío.");
        return;
    }


    datosEnvioTexto =
        `\nDATOS DE ENVÍO:\n` +
        `Estado: ${estado}\n` +
        `Municipio / Ciudad: ${municipio}\n` +
        `Código postal: ${codigoPostal}\n` +
        `Dirección: ${direccion}\n`;

    if (referencias !== "") {
        datosEnvioTexto +=
            `Referencias: ${referencias}\n`;
    }
}
   

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = `Hola, quiero realizar un pedido en Chac Nicté\n\n`;

mensaje += `DATOS DEL CLIENTE\n`;
mensaje += `Nombre: ${nombre}\n`;
mensaje += `Teléfono / WhatsApp: ${telefono}\n\n`;

mensaje += `PEDIDO\n`;

let total = 0;

carrito.forEach((producto, index) => {

    const subtotal =
        producto.precio * producto.cantidad;

    total += subtotal;

    mensaje += `\nPrenda ${index + 1}\n`;
    mensaje += `${producto.nombre}\n`;
    mensaje += `Talla: ${producto.talla}\n`;
    mensaje += `Color: ${producto.color}\n`;
    mensaje += `Cantidad: ${producto.cantidad}\n`;
    mensaje += `Subtotal: $${subtotal.toLocaleString("es-MX")} MXN\n`;
});

mensaje += `\nTOTAL DEL PEDIDO: $${total.toLocaleString("es-MX")} MXN\n\n`;

const formaEntrega =
    entregaSeleccionada.value === "recoger"
        ? "Recoger en X-Pichil"
        : "Envío";

mensaje += `FORMA DE ENTREGA\n`;
mensaje += `FORMA DE ENTREGA\n`;
mensaje += `${formaEntrega}\n`;

if (entregaSeleccionada.value === "envio") {
    mensaje += datosEnvioTexto;
}

mensaje += `\nGracias.`;

const mensajeCodificado = encodeURIComponent(mensaje);

const urlWhatsApp =
    `https://wa.me/?text=${mensajeCodificado}`;

window.open(urlWhatsApp, "_blank");
});