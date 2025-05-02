
// Seleccionamos los elementos de la página
const botonesAgregar = document.querySelectorAll('.btn-agregar'); // Botones para agregar productos al carrito
const modal = document.getElementById('carrito-modal'); // Modal del carrito
const cerrarModal = document.getElementById('cerrar-modal'); // Botón para cerrar el modal
const listaCarrito = document.getElementById('lista-carrito'); // Lista de productos en el carrito
const vaciarCarrito = document.getElementById('vaciar-carrito'); // Botón para vaciar el carrito
const totalCarrito = document.getElementById('total-carrito'); // Elemento para mostrar el total del carrito
const btnWhatsApp = document.getElementById('btn-whatsapp'); // Botón de WhatsApp

// Arreglo para almacenar los productos en el carrito
const productosCarrito = [];

// Función para actualizar el carrito (mostrar productos, total y botón de WhatsApp)
function actualizarCarrito() {
  listaCarrito.innerHTML = ''; // Limpiamos la lista
  let total = 0; // Variable para almacenar el total del carrito

  // Recorremos los productos en el carrito
  productosCarrito.forEach((producto, index) => {
    const li = document.createElement('li'); // Creamos un nuevo <li> para el producto
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio} 
      <button class="btn-eliminar" data-index="${index}">Eliminar</button>
    `;
    listaCarrito.appendChild(li); // Añadimos el producto a la lista
    total += producto.precio; // Sumamos el precio al total
  });

  totalCarrito.textContent = `Total: $${total.toFixed(2)}`; // Actualizamos el total

  // Si hay productos en el carrito, mostramos el botón de WhatsApp
  if (productosCarrito.length > 0) {
    btnWhatsApp.style.display = 'inline-block'; // Mostramos el botón
    // Creamos el texto para el mensaje de WhatsApp
    const texto = encodeURIComponent(
      productosCarrito.map(p => `${p.nombre} - $${p.precio}`).join('\n') + `\nTotal: $${total.toFixed(2)}`
    );
    // Modificamos el enlace del botón de WhatsApp para enviar el mensaje
    btnWhatsApp.href = `https://wa.me/573012345678?text=${texto}`;
  } else {
    btnWhatsApp.style.display = 'none'; // Si no hay productos, ocultamos el botón
  }

  // Agregamos eventos a los botones de eliminar
  document.querySelectorAll('.btn-eliminar').forEach(boton => {
    boton.addEventListener('click', () => {
      const index = boton.getAttribute('data-index'); // Obtenemos el índice del producto
      productosCarrito.splice(index, 1); // Eliminar el producto del carrito
      actualizarCarrito(); // Actualizamos el carrito
    });
  });
}

// Agregamos el evento a los botones "Agregar al carrito"
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    const card = boton.closest('.accesorios-card'); // Obtenemos el producto seleccionado
    const nombre = card.querySelector('h3').textContent; // Nombre del producto
    const precioTexto = card.querySelector('.precio').textContent; // Precio del producto
    const precio = parseFloat(precioTexto.replace('$', '')); // Convertimos el precio a número

    // Añadimos el producto al carrito
    productosCarrito.push({ nombre, precio });
    actualizarCarrito(); // Actualizamos el carrito
    modal.style.display = 'flex'; // Mostramos el modal
  });
});

// Evento para cerrar el modal
cerrarModal.addEventListener('click', () => {
  modal.style.display = 'none'; // Cerramos el modal
});

// Si se hace clic fuera del modal, lo cerramos
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Vaciar el carrito
vaciarCarrito.addEventListener('click', () => {
  productosCarrito.length = 0; // Limpiamos el carrito
  actualizarCarrito(); // Actualizamos la vista del carrito
  modal.style.display = 'none'; // Cerramos el modal
});