document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.button-54').forEach(button => {
        button.addEventListener('click', () => cargarProductos(button.dataset.categoria));
    });

    document.getElementById('carrito-icono').addEventListener('click', toggleDetalleCarrito);
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

    const idiomaPreferido = localStorage.getItem('idiomaSeleccionado') || 'es';
    if (idiomaPreferido === 'en') { // Cambiar al inglés si es el idioma preferido
        cambiarIdioma();
    }
});

const traducciones = {
    es: {
        menu: "MENÚ",
        ron: "RON",
        ginebras: "GINEBRAS",
        cocteles: "COCTELES",
        total: "Total",
        vaciarCarrito: "Vaciar Carrito"
    },
    en: {
        menu: "MENU",
        ron: "RUM",
        ginebras: "GINS",
        cocteles: "COCKTAILS",
        total: "Total",
        vaciarCarrito: "Empty Cart"
    }
};


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
            { id: 6, nombre: 'Piña Colada', precio: 13 }
        ]
    };

    const divProductos = document.getElementById('productos');
    divProductos.innerHTML = ''; // Limpiar productos anteriores

    productosEjemplo[categoria].forEach(producto => {
        // Crear el contenedor del producto
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');

        // Crear un elemento para el nombre del producto
        const nombreProducto = document.createElement('div');
        nombreProducto.classList.add('nombre-producto');
        nombreProducto.textContent = producto.nombre;

        // Crear un elemento para el precio del producto
        const precioProducto = document.createElement('div');
        precioProducto.classList.add('precio-producto');
        precioProducto.textContent = `$${producto.precio}`;

        // Agregar el nombre y precio al contenedor del producto
        divProducto.appendChild(nombreProducto);
        divProducto.appendChild(precioProducto);

        // Añadir el evento onclick para agregar al carrito
        divProducto.onclick = () => agregarAlCarrito(producto);

        // Agregar el producto al contenedor principal de productos
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

        // Crear un elemento para el nombre del producto
        const nombreProducto = document.createElement('span');
        nombreProducto.classList.add('nombre-producto');
        nombreProducto.textContent = producto.nombre;

        // Crear un elemento para el precio del producto
        const precioProducto = document.createElement('span');
        precioProducto.classList.add('precio-producto');
        precioProducto.textContent = ` - $${producto.precio}`;

        // Agregar el nombre y precio al elemento de la lista
        li.appendChild(nombreProducto);
        li.appendChild(precioProducto);

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

let idiomaActual = 'es'; // Español por defecto

function cambiarIdioma() {
    idiomaActual = idiomaActual === 'es' ? 'en' : 'es'; // Cambiar el idioma

    // Actualizar la imagen de la bandera en el botón
    const imagenBandera = document.getElementById('imagen-bandera');
    imagenBandera.src = idiomaActual === 'es' ? 'es.png' : 'en.png';
    imagenBandera.alt = idiomaActual === 'es' ? 'Español' : 'English';

    // Actualizar las traducciones en la página
    document.querySelector('.twelve h1').textContent = traducciones[idiomaActual].menu;
    document.querySelectorAll('.button-54').forEach((button) => {
        button.textContent = traducciones[idiomaActual][button.dataset.categoria];
    });
    document.querySelector('#vaciar-carrito').textContent = traducciones[idiomaActual].vaciarCarrito;
    // Asegúrate de actualizar otros elementos que necesiten traducción

    localStorage.setItem('idiomaSeleccionado', idiomaActual);
    cargarProductos(document.querySelector('.button-54[data-categoria]').dataset.categoria); // Recargar productos en el idioma seleccionado
}

