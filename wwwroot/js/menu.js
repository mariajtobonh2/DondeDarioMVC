
// -- 1. Clase Plato --
class Plato {
    constructor(id, nombre, categoria, precio) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria; // entradas | fuertes | postres | bebidas
        this.precio = precio;
    }

    precioFormateado() {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        }).format(this.precio);
    }
}

// -- 2. Arreglo con el menú (reemplaza la base de datos) --
const menu = [
    new Plato(1, "Empanadas colombianas", "entradas", 12000),
    new Plato(2, "Patacones con hogao", "entradas", 14000),
    new Plato(3, "Bandeja paisa", "fuertes", 38000),
    new Plato(4, "Sancocho de gallina", "fuertes", 32000),
    new Plato(5, "Cazuela típica", "fuertes", 36000),
    new Plato(6, "Postre de oreo", "postres", 10000),
    new Plato(7, "Obleas con arequipe", "postres", 8000),
    new Plato(8, "Lulada", "bebidas", 7000),
    new Plato(9, "Jugo de mora", "bebidas", 6000)
];

// --3. Arreglo del pedido (carrito, sin base de datos) --
let pedido = []; // cada elemento: { plato, cantidad }

// -- 4. Referencias al DOM --
const contenedorMenu = document.getElementById("contenedorMenu");
const filtros = document.getElementById("filtros");
const listaPedido = document.getElementById("listaPedido");
const totalPedidoEl = document.getElementById("totalPedido");
const contadorPedidoEl = document.getElementById("contadorPedido");
const btnVaciarPedido = document.getElementById("btnVaciarPedido");

// -- 5. Mostrar el menú según la categoría elegida (filtrar) --
function renderMenu(categoria) {
    contenedorMenu.innerHTML = "";

    for (let plato of menu) {
        if (categoria === "todos" || plato.categoria === categoria) {
            contenedorMenu.innerHTML += `
                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="card tarjeta-plato">
                        <div class="card-body">
                            <span class="badge bg-secondary mb-2 text-capitalize">${plato.categoria}</span>
                            <h3 class="h5 card-title">${plato.nombre}</h3>
                            <p class="precio">${plato.precioFormateado()}</p>
                            <button class="btn btn-agregar" data-id="${plato.id}">Agregar al pedido</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// -- 6. Agregar un plato al pedido --
function agregarAlPedido(id) {
    let plato = null;
    for (let p of menu) {
        if (p.id === id) {
            plato = p;
        }
    }
    if (plato === null) return;

    let yaEstaba = false;
    for (let item of pedido) {
        if (item.plato.id === id) {
            item.cantidad = item.cantidad + 1;
            yaEstaba = true;
        }
    }

    if (!yaEstaba) {
        pedido.push({ plato: plato, cantidad: 1 });
    }

    renderPedido();
}

// -- 7. Quitar un plato del pedido --
function quitarDelPedido(id) {
    let nuevoPedido = [];
    for (let item of pedido) {
        if (item.plato.id !== id) {
            nuevoPedido.push(item);
        }
    }
    pedido = nuevoPedido;
    renderPedido();
}

// -- 8. Calcular el total --
function calcularTotal() {
    let total = 0;
    for (let item of pedido) {
        total = total + (item.plato.precio * item.cantidad);
    }
    return total;
}

// -- 9. Mostrar el pedido y el total en el DOM --
function renderPedido() {
    listaPedido.innerHTML = "";

    if (pedido.length === 0) {
        listaPedido.innerHTML = `
            <li class="list-group-item text-center text-muted">
                Aún no has agregado platos a tu pedido.
            </li>
        `;
    }

    for (let item of pedido) {
        listaPedido.innerHTML += `
            <li class="list-group-item">
                <span>${item.plato.nombre} x${item.cantidad}</span>
                <button class="btn btn-sm btn-outline-danger btn-quitar" data-id="${item.plato.id}">Quitar</button>
            </li>
        `;
    }

    let cantidadTotal = 0;
    for (let item of pedido) {
        cantidadTotal = cantidadTotal + item.cantidad;
    }

    const totalFormateado = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(calcularTotal());

    totalPedidoEl.textContent = totalFormateado;
    contadorPedidoEl.textContent = cantidadTotal;
}

// -- 10. Eventos --

// Clic en un botón de filtro
filtros.addEventListener("click", function (evento) {
    const boton = evento.target.closest(".btn-filtro");
    if (!boton) return;

    document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("active"));
    boton.classList.add("active");

    renderMenu(boton.dataset.categoria);
});

// Clic en "Agregar al pedido" (los botones se crean con JS, por eso el evento va en el contenedor)
contenedorMenu.addEventListener("click", function (evento) {
    const boton = evento.target.closest(".btn-agregar");
    if (!boton) return;

    agregarAlPedido(Number(boton.dataset.id));
});

// Clic en "Quitar" dentro del pedido
listaPedido.addEventListener("click", function (evento) {
    const boton = evento.target.closest(".btn-quitar");
    if (!boton) return;

    quitarDelPedido(Number(boton.dataset.id));
});

// Vaciar todo el pedido
btnVaciarPedido.addEventListener("click", function () {
    pedido = [];
    renderPedido();
});

// -- 11. Primera pintura al cargar la página --
renderMenu("todos");
renderPedido();