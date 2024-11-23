document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profileForm");
  const emailInput = document.getElementById("email");
  const firstNameInput = document.getElementById("firstName");
  const middleNameInput = document.getElementById("middleName");
  const lastNameInput = document.getElementById("lastName");
  const secondLastNameInput = document.getElementById("secondLastName");
  const contactPhoneInput = document.getElementById("contactPhone");
  const profilePhotoInput = document.getElementById("profilePhoto");
  const profileImagePreview = document.getElementById("profileImagePreview");

  // Verificar si el usuario está logueado
  const loggedUserEmail = localStorage.getItem('email');
  if (!loggedUserEmail) {
    alert('Por favor, inicia sesión primero.', 'warning');
    window.location.href = 'login.html';
    return;
  }

  // Cargar el email del usuario logueado
  emailInput.value = loggedUserEmail;

    // Cargar datos previos si existen
  const savedProfile = JSON.parse(localStorage.getItem('userProfile')); // Cargar el perfil guardado
  if (savedProfile) {
    firstNameInput.value = savedProfile.firstName || "";
    middleNameInput.value = savedProfile.middleName || "";
    lastNameInput.value = savedProfile.lastName || "";
    secondLastNameInput.value = savedProfile.secondLastName || "";
    contactPhoneInput.value = savedProfile.contactPhone || "";
    
 // Mostrar la imagen de perfil si existe
 if (savedProfile.profilePhoto) {
  profileImagePreview.src = savedProfile.profilePhoto; // Cargar la imagen guardada
} else {
  profileImagePreview.src = "pexels-olly-789822-modified 1.png"; // Imagen por defecto
}
} else {
// Si no hay perfil guardado, mostrar la imagen por defecto
profileImagePreview.src = "pexels-olly-789822-modified 1.png"; // Cambia esto si es necesario
}

// Actualizar la previsualización cuando se selecciona un archivo
profilePhotoInput.addEventListener("change", function (e) {
const file = e.target.files[0];
if (file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    profileImagePreview.src = event.target.result; // Actualizar la imagen de previsualización
  };
  reader.readAsDataURL(file);
} else {
  // Si no se selecciona ninguna imagen, volver a la imagen por defecto
  profileImagePreview.src = "pexels-olly-789822-modified 1.png"; // Cambia esto si es necesario
}
});

  // subir foto
const subirfoto = document.getElementById('subirfoto');
subirfoto.addEventListener("click", function (e) {
  e.preventDefault()
  document.getElementById('profilePhoto').click();
});


// Validación y guardado de datos en localStorage
profileForm.addEventListener("submit", function (e) {
e.preventDefault();

 // Validar campos obligatorios
 if (!firstNameInput.value || !lastNameInput.value || !emailInput.value) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Guardar datos en local storage
    const userProfile = {
        firstName: firstNameInput.value,
        middleName: document.getElementById("middleName").value,
        lastName: lastNameInput.value,
        secondLastName: document.getElementById("secondLastName").value,
        contactPhone: contactPhoneInput.value,
        email: emailInput.value,
        profilePhoto: profileImagePreview.src
    };

    // Guardar perfil de usuario en localStorage
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    alert("Datos guardados con éxito.");

    // Redirigir a la página principal
    window.location.href = "index.html";
});
document.getElementById("cerrarSesion").addEventListener("click", function() {
  localStorage.removeItem('email'); // Limpiar el email del localStorage
  localStorage.removeItem('userProfile'); // Limpiar el perfil guardado
  window.location.href = 'login.html'; // Redirigir a la página de login
});
});

// Cambio de tema claro/oscuro
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener("click", function (e) {
  e.preventDefault()
  document.body.classList.toggle("dark-mode");
});

// Desafiate, cantidad de productos en carrito
function actualizarBadgeCarrito() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById("cartCountBadge").innerText = totalQuantity;
}
document.addEventListener("DOMContentLoaded", function() {
  actualizarBadgeCarrito();
});


