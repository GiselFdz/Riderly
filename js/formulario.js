
// Selección del formulario y el campo de respuesta
const form = document.getElementById('contactForm');
const respuesta = document.getElementById('respuesta');

// Función para manejar el envío del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío por defecto

  // Mostrar un mensaje de confirmación (simulado)
  setTimeout(() => {
    respuesta.textContent = "¡Gracias por tu mensaje! Nos pondremos en contacto pronto.";
    form.reset(); // Limpiar el formulario
  }, 1000); // Simula un pequeño retraso en la respuesta
});