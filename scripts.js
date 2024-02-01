document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.categoria-btn').forEach(button => {
        button.addEventListener('click', () => cargarProductos(button.dataset.categoria));
    });

    document.getElementById('carrito-icono').addEventListener('click', toggleDetalleCarrito);
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
});

let carrito = [];

function cargarProductos(categoria) {
    const productosEjemplo = {
        ron: [
            { id: 1, nombre: 'Ron Añejo', precio: 20 },
            { id: 2, nombre: 'Ron Blanco', precio: 15 }
        ],
        ginebras: [
            { id: 3, nombre: 'Ginebra Seca', precio: 25 },
            { id: 4, nombre: 'Ginebra Aromática', precio: 30 }
        ],
        cocteles: [
            { id: 5, nombre: 'Mojito', precio: 10 },
            { id: 6, nombre: 'Piña Colada', precio: 12 }
        ]
    };

    const divProductos = document.getElementById('productos');
    divProductos.innerHTML = ''; // Limpiar productos anteriores

    productosEjemplo[categoria].forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.textContent = `${producto.nombre} - $${producto.precio}`;
        divProducto.onclick = () => agregarAlCarrito(producto);
        divProductos.appendChild(divProducto);
    });
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarDetalleCarrito();
}

function actualizarDetalleCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = ''; // Limpiar detalle carrito

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);
    });

    actualizarTotal();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    document.getElementById('total-carrito').textContent = total;
    document.getElementById('contador-carrito').textContent = '$' + total;
}

function vaciarCarrito() {
    carrito = [];
    actualizarDetalleCarrito();
}

function toggleDetalleCarrito() {
    const detalle = document.getElementById('detalle-carrito');
    detalle.classList.toggle('visible');
}
