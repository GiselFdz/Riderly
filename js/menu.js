
// Selección de elementos del DOM
const menuToggle = document.getElementById('menu-toggle'); // Obtén el botón del menú
const nav = document.querySelector('nav'); // Obtén el contenedor del menú

// Añadir el evento de clic al botón
menuToggle.addEventListener('click', function() {
  // Toggle (alternar) la clase 'active' en el menú
  nav.classList.toggle('active');
});