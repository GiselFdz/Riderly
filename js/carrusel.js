// Selección de elementos del DOM
const slider = document.querySelector("#slider");
let sliderSections = document.querySelectorAll(".slider--section");
let sliderSectionLast = sliderSections[sliderSections.length - 1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

// Coloca la última sección al principio para crear un loop
slider.insertAdjacentElement('afterbegin', sliderSectionLast);

// Función para ocultar el texto en todas las imágenes
function ocultarTexto() {
  sliderSections.forEach(section => {
    section.classList.remove('active');
  });
}

// Función para mostrar el texto en la imagen activa
function mostrarTexto() {
  sliderSections = document.querySelectorAll(".slider--section");
  setTimeout(() => {
    sliderSections[1].classList.add('active'); // Muestra el texto de la segunda sección
  }, 100);
}

// Función para mover al siguiente slide
function Next() {
  ocultarTexto();
  let sliderSectionFirst = document.querySelectorAll(".slider--section")[0];
  slider.style.transition = "all 0.5s ease-in-out";
  slider.style.marginLeft = "-200%"; // Mueve hacia la izquierda

  setTimeout(function () {
    slider.style.transition = "none";
    slider.insertAdjacentElement('beforeend', sliderSectionFirst); // Mueve la primera sección al final
    slider.style.marginLeft = "-100%"; // Ajusta la posición correctamente
    mostrarTexto();
  }, 500);
}

// Función para mover al slide anterior
function Prev() {
  ocultarTexto();
  let sliderSections = document.querySelectorAll(".slider--section");
  let sliderSectionLast = sliderSections[sliderSections.length - 1];
  slider.style.transition = "all 0.5s ease-in-out";
  slider.style.marginLeft = "0"; // Mueve hacia la derecha

  setTimeout(function () {
    slider.style.transition = "none";
    slider.insertAdjacentElement('afterbegin', sliderSectionLast); // Mueve la última sección al inicio
    slider.style.marginLeft = "-100%"; // Ajusta la posición correctamente
    mostrarTexto();
  }, 500);
}

// Eventos para los botones de navegación
btnRight.addEventListener('click', function () {
  Next();
});

btnLeft.addEventListener('click', function () {
  Prev();
});

// Cambio automático cada 5 segundos
setInterval(function () {
  Next();
}, 5000);

// Mostrar texto inicial en la primera imagen
mostrarTexto();