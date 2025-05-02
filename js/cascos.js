
// Traemos elementos del DOM que vamos a usar
const carritoModal = document.getElementById('carritoModal');
const listaCarrito = document.getElementById('listaCarrito');
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const enlaceWhatsapp = document.getElementById('enlaceWhatsapp');
const contadorCarrito = document.getElementById('contadorCarrito');
const iconoCarrito = document.getElementById('iconoCarrito');
const cerrarModal = document.getElementById('cerrarModal');

// Variable para contar la cantidad de productos agregados
let cantidadCarrito = 0;

// --- Funciones principales ---

// Función para abrir el modal del carrito
function abrirCarrito() {
  carritoModal.style.display = 'flex';
}

// Función para cerrar el modal del carrito
function cerrarCarrito() {
  carritoModal.style.display = 'none';
}

// --- Eventos ---

// Agregamos un evento click a TODOS los botones "Agregar al carrito"
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', (e) => {
    // Buscamos el card (tarjeta) del casco donde hicimos click
    const cascoCard = e.target.closest('.casco-card');
    // Sacamos el nombre y el precio del casco
    const nombreProducto = cascoCard.querySelector('h3').textContent;
    const precioProducto = cascoCard.querySelector('.precio').textContent;

    // Creamos un nuevo elemento <li> para agregarlo al carrito
    const li = document.createElement('li');
    li.innerHTML = `${nombreProducto} - ${precioProducto} <button class="eliminar">❌</button>`;
    listaCarrito.appendChild(li);

    // Actualizamos la cantidad de productos en el carrito
    cantidadCarrito++;
    contadorCarrito.textContent = cantidadCarrito;

    // Actualizamos el botón de WhatsApp con los productos actuales
    actualizarWhatsapp();

    // Abrimos el carrito automáticamente
    abrirCarrito();

    // Hacemos que el ícono del carrito salte
    saltarCarrito();
  });
});

// Cerrar carrito si clickeamos afuera del modal
window.addEventListener('click', function(event) {
  if (event.target === carritoModal) {
    cerrarCarrito();
  }
});

// Cerrar carrito al apretar la "X" (botón cerrar)
cerrarModal.addEventListener('click', cerrarCarrito);

// Eliminar productos del carrito
listaCarrito.addEventListener('click', function(event) {
  if (event.target.classList.contains('eliminar')) {
    // Si clickeamos en el botón "❌", eliminamos ese producto
    event.target.parentElement.remove();
    cantidadCarrito--;
    contadorCarrito.textContent = cantidadCarrito;
    actualizarWhatsapp(); // Actualizamos el link de WhatsApp
  }
});

// --- Funciones auxiliares ---

// Función para actualizar el botón de WhatsApp
function actualizarWhatsapp() {
  const items = listaCarrito.querySelectorAll('li');

  if (items.length === 0) {
    // Si no hay productos, ocultamos el botón de WhatsApp
    enlaceWhatsapp.style.display = 'none';
  } else {
    // Si hay productos, mostramos el botón
    enlaceWhatsapp.style.display = 'inline-block';

    // Creamos el texto que vamos a enviar por WhatsApp
    let productos = [];
    items.forEach(item => {
      productos.push(item.childNodes[0].textContent.trim());
    });

    // Armamos el mensaje final
    const mensaje = `Hola, quiero consultar sobre los siguientes productos:%0A- ${productos.join('%0A- ')}`;

    // Actualizamos el link del botón con el mensaje
    enlaceWhatsapp.href = `https://wa.me/5492993255741?text=${mensaje}`;
  }
}

// Función para hacer saltar el carrito cuando agregamos un producto
function saltarCarrito() {
  iconoCarrito.classList.add('saltar');
  setTimeout(() => {
    iconoCarrito.classList.remove('saltar');
  }, 400); // Quitamos la animación después de 0.4 segundos
}