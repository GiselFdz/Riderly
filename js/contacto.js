
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío por defecto del formulario
  
    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;
  
    // Validación simple
    if (!nombre || !email || !mensaje) {
      document.getElementById("respuesta").innerHTML = "Por favor, completa todos los campos.";
      document.getElementById("respuesta").style.color = "red";
      return;
    }
  
    // Validar formato del email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      document.getElementById("respuesta").innerHTML = "Por favor, ingresa un email válido.";
      document.getElementById("respuesta").style.color = "red";
      return;
    }
  
    // Si todo es correcto, mostramos un mensaje de éxito
    document.getElementById("respuesta").innerHTML = "Formulario enviado con éxito. Te responderemos pronto.";
    document.getElementById("respuesta").style.color = "green";
  
    // Enviar el formulario manualmente después de la validación
    setTimeout(() => {
      document.getElementById("contactForm").submit();
    }, 2000); // Simula un pequeño retraso antes de enviar
  });