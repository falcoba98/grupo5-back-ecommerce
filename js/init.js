// Funciones previas para la obtención de datos y la autenticación
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function() {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function() {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function(error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

let showuser = function(email) {
  document.addEventListener("DOMContentLoaded", function () {
    let navBar = document.getElementById("navbarNav");
    if (!navBar) {
      return;
    }
    // const ul = navBar.querySelector('ul');
    // ul.insertAdjacentHTML('beforeend', '<li class="nav-item"><a href="#" class="nav-link">'+email+'</a></li>');
  })
}

let autentication = function() {
  let session = window.localStorage.getItem("email");
  if (!session) {
    window.location.href = "login.html";
    return;
  }
  showuser(session);
}

autentication();

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("cerrarSesion").addEventListener("click", function() {
    localStorage.removeItem("email");
    window.location = "login.html";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Obtener el email almacenado en localStorage
  const email = localStorage.getItem("email");  
  const userButton = document.querySelector('.dropdown-toggle');
  // Verificar si hay un usuario guardado en localStorage
  if (email && userButton) {
    // Cambiar el texto del botón con el nombre del usuario
    userButton.textContent = email;
  }
});

// Modo oscuro
document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggle-mode');
  const body = document.body;

  // Función para aplicar el modo oscuro
  function applyDarkMode() {
    body.classList.add('dark-mode');
    toggleButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
    localStorage.setItem('dark-mode', 'enabled');
  }

  // Función para quitar el modo oscuro
  function removeDarkMode() {
    body.classList.remove('dark-mode');
    toggleButton.innerHTML = '<i class="bi bi-moon-fill"></i>';
    localStorage.setItem('dark-mode', 'disabled');
  }

  // Comprobar el estado del modo oscuro al cargar la página
  if (localStorage.getItem('dark-mode') === 'enabled') {
    applyDarkMode();
  } else {
    removeDarkMode();
  }

  // Manejar el clic en el botón de alternar modo
  toggleButton.addEventListener('click', function() {
    if (body.classList.contains('dark-mode')) {
      removeDarkMode();
    } else {
      applyDarkMode();
    }
  });

  // Función para actualizar estilos específicos de la página de categorías
  function updateCategoryStyles() {
    if (window.location.pathname.includes('categories.html')) {
      const outsideCardElements = document.querySelectorAll('.categoria-titulo, .lead, hr, body > p, body > h1, body > h2, body > h3, body > h4, body > h5, body > h6');
      const cardElements = document.querySelectorAll('.card, .custom-cardinga-body, .list-group-item');
      const categoryTitles = document.querySelectorAll('.category-title');

      cardElements.forEach(element => {
        if (body.classList.contains('dark-mode')) {
          element.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';  // Fondo oscuro para las tarjetas
          element.style.color = '#707070';  // Texto gris más oscuro dentro de las tarjetas
          element.style.opacity = '0.9';
        } else {
          element.style.backgroundColor = '';
          element.style.color = '';
          element.style.opacity = '1';
        }

        // Aplicar estilos a los elementos de texto dentro de las tarjetas
        const cardTextElements = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
        cardTextElements.forEach(textElement => {
          if (body.classList.contains('dark-mode')) {
            if (!textElement.classList.contains('category-title')) {
              textElement.style.color = '#707070';  // Texto gris más oscuro dentro de las tarjetas, excepto para .category-title
            }
          } else {
            textElement.style.color = '';
          }
        });
      });

      // Manejar específicamente los elementos .category-title
      categoryTitles.forEach(title => {
        if (body.classList.contains('dark-mode')) {
          title.style.position = 'relative';
          title.style.zIndex = '2';
        } else {
          title.style.position = '';
          title.style.zIndex = '';
        }
      });
    }
  }

  updateCategoryStyles();
  toggleButton.addEventListener('click', updateCategoryStyles);
});
