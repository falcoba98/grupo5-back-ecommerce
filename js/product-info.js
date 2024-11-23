// Función para ir a un producto
function irAProducto(idProducto) {
    // Almacena el nuevo ID de producto en localStorage
    localStorage.setItem("productoId", idProducto);
    // Recarga la página para mostrar el nuevo producto
    location.reload();
}

document.addEventListener("DOMContentLoaded", function() {

// obtener el Identificador de producto
const productoId = localStorage.getItem("productoId");
    if (!productoId) {
        console.error("No se ha encontrado el ID del producto.");
        return;
    }
// obtener el identificador de categoría
const categoriaID = localStorage.getItem("catID");
    if (!categoriaID) {
        console.error("No se ha encontrado el ID de la categoría.");
        return;
    }

// URLs para realizar solicitud a un API y obtener info
const urlProducto = `${PRODUCT_INFO_URL}${productoId}${EXT_TYPE}`; // Usa el ID del producto
const urlCat = `${PRODUCTS_URL}${categoriaID}${EXT_TYPE}`; // Usa el ID de la categoría

// Obtener la información del producto actual
getJSONData(urlProducto).then(function(resultObj) {
    if (resultObj.status === "ok") {
        const producto = resultObj.data;
        mostrarProducto(producto);}
    });
    
// Obtener productos de la misma categoría
getJSONData(urlCat).then(function(relatedResult) {
    if (relatedResult.status === "ok") {
        const productosRelacionados = relatedResult.data.products;
        console.log("Productos filtrados relacionados:", productosRelacionados); // Añadir esto para verificar
        mostrarProductosRelacionados(productosRelacionados);
    } else {
        console.error("Error en la obtención de productos relacionados:", relatedResult.data);
    }
}).catch(function(error) {
    console.error("Error en la solicitud de productos relacionados:", error);
});


//realiza una solicitud HTTP para obtener datos en formato JSON desde la URL especificada.
/*getJSONData(url).then(function(resultObj) {
    if (resultObj.status === "ok") {
         mostrarProducto(resultObj.data);
    } else {
        console.error("Error en la obtención de datos:", resultObj.data);
    }
});*/

//para obtener los comentarios del producto
const urlComentarios = `https://japceibal.github.io/emercado-api/products_comments/${productoId}.json`;
getJSONData(urlComentarios).then(function(resultObj) {
    if (resultObj.status === "ok") {
        console.log(resultObj.data); // Agrega este log para ver los datos en la consola
        mostrarCalificaciones(resultObj.data);
    } else {
        console.error("Error en la obtención de comentarios:", resultObj.data);
    }
});

// Agregar evento de aplicar filtros
// document.getElementById('apply-filters').addEventListener('click', applyFilters);
// Obtener la información del producto actual
getJSONData(urlProducto).then(function(resultObj) {
    if (resultObj.status === "ok") {
        const producto = resultObj.data;
            mostrarProducto(producto);}
        });

// Función para mostrar el producto
function mostrarProducto(producto) {
    // genera HTML para cada imagen en el array, con la estructura de Bootstrap para el carrusel
    //con controles para navegar entre las imágenes y asegurar que el diseño sea limpio y responsivo
    let imagesHtml = producto.images.map((img, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${img}" class="d-block w-100" alt="${producto.name}">
    </div>
`).join('');

let htmlContentToAppend = `
    <div class="col-12">
        <div id="productCarousel" class="carousel slide shadow-lg rounded">
            <div class="carousel-inner">
                ${imagesHtml}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="custom-card-body">
            <hr style="border: 3px solid #ff8a0d; width: 100%; margin: 0;">
            <h5 class="card-title text-center fw-bold fs-1">${producto.name}</h5>
            <hr style="border: 3px solid #ff8a0d; width: 100%; margin: 0 auto 20px auto;">
            <p class="card-text" style="font-size: 1.5rem;">${producto.description}</p>
            <p class="card-text" style="font-size: 1.1rem;"><strong>Categoria:</strong> ${producto.category}</p>
            <p class="card-text" style="font-size: 1.1rem;"><strong>Vendidos:</strong> ${producto.soldCount}</p>
            <p class="card-text text-danger" style="font-size: 1.1rem;"><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-danger btn-comprar" onclick="comprar('${encodeURIComponent(JSON.stringify(producto))}')">Comprar</button>
            </div>
        </div>
    </div>
    `;
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el nombre de usuario almacenado en localStorage
    const usuario = window.localStorage.getItem("email");

    // Verificar si hay un usuario guardado en localStorage
    if (usuario) {
        // Cambiar el texto del botón con el nombre del usuario
        const userButton = document.querySelector('.dropdown-toggle');
        userButton.textContent = usuario;
    } else {
        // Si no hay usuario logueado, redirigir al login
        window.location.href = "login.html";
    }

    // Cerrar sesión: limpiar el localStorage y redirigir al login
    document.getElementById("cerrarSesion").addEventListener("click", function() {
        window.localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });
});



// Función para mostrar productos relacionados
function mostrarProductosRelacionados(productos) {
    if (productos.length === 0) {
        document.getElementById("related-products").innerHTML = "<p>No hay productos relacionados.</p>";
        return;
    }
       // Agregar título de "Productos Relacionados"
       let tituloHtml = `
       <h2 class="text-center mt-5 mb-4">Productos Relacionados</h2>
   `;
    // Agrupa los productos de 3 en 3
    let groupedProducts = [];
    for (let i = 0; i < productos.length; i += 3) {
        groupedProducts.push(productos.slice(i, i + 3));
    }

    // Construir el HTML del carrusel con los productos relacionados
    let relatedHtml = groupedProducts.map((group, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="row justify-content-center">
                ${group.map(producto => `
                    <div class="col-md-4 d-flex justify-content-center mb-4">
                        <div class="card" style="width: 18rem;">
                            <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.name}</h5>
                                <p class="card-text text-danger">${producto.currency} ${producto.cost}</p>
                                <button class="btn btn-primary" onclick="irAProducto(${producto.id})">Ver producto</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    let carouselHtml = `
    <div id="relatedProductsCarousel" class="carousel slide mt-3" data-bs-ride="carousel">
        <div class="carousel-inner">
            ${relatedHtml}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#relatedProductsCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#relatedProductsCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `;

    // Agregar el título y el carrusel al contenedor
    document.getElementById("related-products").innerHTML = tituloHtml + carouselHtml;
}

// Función para generar estrellas
function generarEstrellas(puntuacion) {
    let estrellasHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= puntuacion) {
            estrellasHtml += '<span class="bi bi-star-fill stars"></span>'; // Estrella llena
        } else {
            estrellasHtml += '<span class="bi bi-star stars"></span>'; // Estrella vacía
        }
    }
    return estrellasHtml;
}

// Función para mostrar las calificaciones (comentarios) como cards
function mostrarCalificaciones(comentarios) {
    let calificacionesHtml = ''; // Iniciar como cadena vacía

    // Iterar sobre cada comentario
    comentarios.forEach(comentario => {
        calificacionesHtml += `
            <div class="card comment-card mb-4 shadow-sm"> <!-- Asegúrate de usar comment-card aquí -->
                <div class="card-body">
                    <h5 class="card-title">${comentario.user}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${comentario.dateTime}</h6>
                    <p class="card-text"><strong>Comentario:</strong> ${comentario.description}</p>
                    <p class="card-text"><strong>Producto ID:</strong> ${comentario.product}</p>
                    <p class="card-text"><strong>Puntuación:</strong> ${generarEstrellas(comentario.score)}</p>
                </div>
            </div>
        `;
    });

    // Asignar el HTML generado al contenedor de calificaciones
    document.getElementById("calificaciones-lista").innerHTML = calificacionesHtml;
}


// DESAFIATE Manejador para la selección de estrellas y el envío de comentarios
document.addEventListener("DOMContentLoaded", function() {
    let calificacionSeleccionada = 0;

    // Evento para seleccionar estrellas
    const estrellas = document.querySelectorAll('.bi-star, .bi-star-fill');
    estrellas.forEach(estrella => {
        estrella.addEventListener('click', function() {
            calificacionSeleccionada = parseInt(this.getAttribute('attr-data'));

            // Resaltar las estrellas según la selección
            estrellas.forEach(star => {
                if (parseInt(star.getAttribute('attr-data')) <= calificacionSeleccionada) {
                    star.classList.remove('bi-star');
                    star.classList.add('bi-star-fill');
                } else {
                    star.classList.remove('bi-star-fill');
                    star.classList.add('bi-star');
                }
            });
        });
    });

// Manejar el envío de comentario
document.querySelector('.btn-enviar').addEventListener('click', function() {
        const comentarioTexto = document.getElementById('comment-text').value;
        const nombreUsuario = window.localStorage.getItem('usuario') ?? "Usuario anónimo"; // Puedes reemplazarlo por un valor almacenado o capturado
        if (calificacionSeleccionada === 0) {
            calificacionSeleccionada = 1;
        }

        // Validar si se ha ingresado un comentario y una calificación
        if (comentarioTexto.trim() === "") {
            alert("Por favor, completa el comentario y selecciona una calificación.");
            return;
        }

        // Crear un objeto con el nuevo comentario
        const nuevoComentario = {
            user: nombreUsuario,
            description: comentarioTexto,
            score: calificacionSeleccionada,
            dateTime: new Date().toLocaleString(),
            product: localStorage.getItem("productoId")  
        };

        // Añadir el nuevo comentario a la lista de comentarios
        agregarComentario(nuevoComentario);

        // Limpiar el formulario
        document.getElementById('comment-text').value = '';
        estrellas.forEach((star, index) => {
            star.classList.remove('bi-star-fill', 'bi-star');
            if (index == 0) {
                star.classList.add('bi-star-fill');
            } else {
                star.classList.add('bi-star');
            }
        });
        
        calificacionSeleccionada = 1;
    });

    // Función para mostrar el nuevo comentario en la lista
    function agregarComentario(comentario) {
        const calificacionesLista = document.getElementById("calificaciones-lista");

        let estrellasHtml = '';
        for (let i = 1; i <= 5; i++) {
            estrellasHtml += i <= comentario.score ? '<span class="bi bi-star-fill stars"></span>' : '<span class="bi bi-star stars"></span>';
        }

        const comentarioHtml = `
            <div class="calificacion-card">
                <h5 class="fw-bold" style="color: #ff8a0d;">${comentario.user}</h5>
                <h6 class="text-muted">${comentario.dateTime}</h6>
                <p><strong>Comentario:</strong> ${comentario.description}</p>
                <p><strong>Puntuación:</strong> ${estrellasHtml}</p>
            </div>
        `;

// Agregar el comentario al inicio de la lista
calificacionesLista.insertAdjacentHTML('afterbegin', comentarioHtml);
    }
})})
function comprar(data) {
    let cart = [];
    if (window.localStorage.getItem("cartItems")) {
        cart = JSON.parse(window.localStorage.getItem("cartItems"));
    }
    
    const producto = JSON.parse(decodeURIComponent(data));
    
    // Verifica si el producto ya está en el carrito
    console.log("Producto agregado:", producto);

    const existingProduct = cart.find(item => item.id === producto.id);
    // Si ya existe aumenta la cantidad
    if (existingProduct) {
        existingProduct.quantity += 1;
    // Si no existe agrega el producto al carrito con cantidad 1
    } else {
        producto.quantity = 1;
        cart.push(producto);
    }
    
    window.localStorage.setItem("cartItems", JSON.stringify(cart));
    window.location.href = "cart.html";
}
// Desafiate, cantidad de productos en carrito
function actualizarBadgeCarrito() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById("cartCountBadge").innerText = totalQuantity;
  }
  document.addEventListener("DOMContentLoaded", function() {
    actualizarBadgeCarrito();
});