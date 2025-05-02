
// Selección de elementos del DOM
const botonesFicha = document.querySelectorAll(".btn-ficha");
const modal = document.getElementById("ficha-modal");
const cerrarModal = document.getElementById("cerrar-modal");
const fichaDetalle = document.getElementById("ficha-detalle");
const btnWhatsApp = document.getElementById("whatsapp-btn"); // Nuevo botón de WhatsApp

// Cargar el archivo JSON
fetch('motos.json')
  .then(response => response.json())  // Convertir la respuesta a JSON
  .then(datos => {
    // Datos obtenidos desde el JSON
    const motos = datos.motos;  // Array de motos

    // Mostrar modal con la ficha técnica
    botonesFicha.forEach(boton => {
      boton.addEventListener("click", () => {
        const idMoto = boton.dataset.moto; // Obtener el ID de la moto desde el botón
        // Buscar la moto correspondiente en el array de motos
        const moto = motos.find(m => m.id === idMoto);
        
        if (moto) {
          fichaDetalle.innerHTML = `
            <h2>${moto.modelo}</h2>
            <img src="${moto.imagen}" alt="${moto.modelo}" style="width: 100%; max-width: 400px;"/>
            <p><strong>Marca:</strong> ${moto.marca}</p>
            <p><strong>Precio:</strong> ${moto.precio}</p>
            <h3>Ficha Técnica:</h3>
            <ul>
              <li><strong>Cilindrada:</strong> ${moto.ficha.cilindrada}</li>
              <li><strong>Motor:</strong> ${moto.ficha.motor}</li>
              <li><strong>Potencia:</strong> ${moto.ficha.potencia}</li>
              <li><strong>Transmisión:</strong> ${moto.ficha.transmision}</li>
              <li><strong>Peso:</strong> ${moto.ficha.peso}</li>
              <li><strong>Otros:</strong> ${moto.ficha.otros}</li>
            </ul>
          `;
          
          // Crear un mensaje personalizado para WhatsApp
          const mensajeWhatsApp = `¡Hola! Estoy interesado en la moto ${moto.modelo}. Me gustaría saber más detalles.`;

          // Establecer el enlace del botón de WhatsApp
          btnWhatsApp.href = `https://wa.me/11234567890?text=${encodeURIComponent(mensajeWhatsApp)}`;
        } else {
          fichaDetalle.innerHTML = "<p>Ficha técnica no disponible.</p>";
        }
        modal.style.display = "flex";
      });
    });
  })
  .catch(error => console.error("Error al cargar el archivo JSON", error));

// Cerrar el modal
cerrarModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// También cerrar haciendo clic fuera del contenido
window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});