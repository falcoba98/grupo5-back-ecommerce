let productos = []; // variable para almacenar los productos

function mostrarProductos(productosArray) {
    let htmlContentToAppend = "";

    // iterar sobre cada producto usando forEach
    //diferentes columnas para que se ajusten a las pantallas
    // Iterar sobre cada producto usando forEach
    //agregamos el onclick para redirigir
    productosArray.forEach(producto => {
        htmlContentToAppend += `
        <div class="col-lg-4 col-md-4 col-ms-12 col-12">
            <div class="card mb-4 shadow-lg rounded" style="box-shadow: 0 4px 8px #ff8a0d;" onclick="guardarProductoYRedirigir(${producto.id})">
                <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold">${producto.name}</h5>
                    <p class="card-text" style="font-size: 0.9rem;">${producto.description}</p>
                    <div class="d-flex justify-content-between mt-4">
                        <span class="text-danger fw-bold" style="position: absolute; bottom: 10px; left: 10px;">
                            ${producto.currency} ${producto.cost}
                        </span>
                        <span class="fw-bold" style="position: absolute; bottom: 10px; right: 10px;">
                            Vendidos: ${producto.soldCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

// insertar el contenido HTML generado en el contenedor de productos
    document.getElementById("productos-lista").innerHTML = htmlContentToAppend;
}

// función para guardar el ID del producto y redirigir
function guardarProductoYRedirigir(productoId) {
    // guarda el ID del producto en el almacenamiento local
    localStorage.setItem("productoId", productoId);
    // redirige al usuario a la página product-info.html
    window.location.href = "product-info.html";
}


// Llamada a la función cuando los datos están disponibles
/*getJSONData(PRODUCTS_URL + "101.json").then(function(resultObj) {
    if (resultObj.status === "ok") {
        mostrarProductos(resultObj.data.products); // aca usamos forEach
    } else {
        console.error("Error en la obtención de datos:", resultObj.data);
    }
});*/

function productosVacios() {
    document.getElementById("productos-lista").innerHTML = "<div class='col-md-4'> No hay productos para mostrar. </div>";
}

function productoTitulos(titulo) {
    document.getElementById("productos-titulo").innerHTML = "Productos / " + titulo;
}

function applyFilters() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const sortOrder = document.getElementById('sort-order').value;

    let filteredProductos = productos.filter(producto =>
        producto.cost >= minPrice && producto.cost <= maxPrice
    );

    if (sortOrder === 'price-asc') {
        filteredProductos.sort((a, b) => a.cost - b.cost);
    } else if (sortOrder === 'price-desc') {
        filteredProductos.sort((a, b) => b.cost - a.cost);
    } else if (sortOrder === 'relevance-desc') {
        filteredProductos.sort((a, b) => b.soldCount - a.soldCount);
    }

    mostrarProductos(filteredProductos);
}

function clearFilters() {
    document.getElementById('min-price').value = null;
    document.getElementById('max-price').value = null;
    applyFilters()
}

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID de categoría desde localStorage
    const categoriaID = localStorage.getItem('catID');
    console.log(`Categoría ID obtenido: ${categoriaID}`);

    if (categoriaID) {
        // Obtener los productos de la categoría
        getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${categoriaID}.json`)
            .then(function(resultObj) {
                if (resultObj.status === "ok") {
                    if (resultObj.data.products.length > 0) {
                        productos = resultObj.data.products;
                        mostrarProductos(productos);

                        // Buscador en tiempo real
                        const input = document.getElementById('inputBuscador');
                        input.addEventListener('input', function() {
                            const inputTexto = input.value.trim().toUpperCase();
                            const productosFiltrados = productos.filter(producto =>
                                producto.name.toUpperCase().includes(inputTexto) ||
                                producto.description.toUpperCase().includes(inputTexto)
                            );
                            mostrarProductos(productosFiltrados);
                        });

                        applyFilters(); // Aplicar filtros

                    } else {
                        productosVacios(); // Si no hay productos
                    }

                    if (resultObj.data.catName) {
                        productoTitulos(resultObj.data.catName); // Mostrar el título de la categoría
                    }
                } else {
                    console.error("Error en la obtención de datos:", resultObj.data);
                }
            });
    } else {
        console.error("No se encontró el ID de categoría en el almacenamiento local.");
    }

    // Obtener el nombre de usuario almacenado en localStorage
    const usuario = window.localStorage.getItem("email");

    // Verificar si hay un usuario guardado
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

    // Agregar evento de aplicar filtros
    document.getElementById('apply-filters').addEventListener('click', applyFilters);

    // Limpiar filtros
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
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