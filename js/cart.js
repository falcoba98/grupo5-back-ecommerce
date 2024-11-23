document.addEventListener("DOMContentLoaded", function() {
  const cartContainer = document.getElementById("cart-container");
  const storedCart = localStorage.getItem("cartItems");

  if (storedCart) {
    const cartItems = JSON.parse(storedCart);

    if (cartItems.length > 0) {
      cartContainer.innerHTML = `
        <h4 class="mb-5 fw-bold">Mi Carrito <i class="bi bi-cart me-2"></i></h4>
        <div class="header row ms-5 me-5 mb-4 text-center fw-bold">
          <div class="col-4 header-etiquetas me-1 d-xs-none d-none d-sm-none d-md-block">Producto</div>
          <div class="col-2 header-etiquetas me-1 d-xs-none d-none d-md-block">Precio</div>
          <div class="col-2 header-etiquetas me-1 d-xs-none d-none d-md-block">Cantidad</div>
          <div class="col-3 header-etiquetas d-none d-sm-none d-md-block">Subtotal</div>
        </div>`;

        cartItems.forEach((item, index) => {
          cartContainer.innerHTML += `
            <div class="card ms-1 me-1 ms-md-5 me-md-5 me-1 cart-item shadow-sm" id="cart-item-${index}">
              <div class="row g-0">
                <div class="col-lg-2 col-md-12 col-sm-12 d-flex align-items-center justify-content-start">
                  <img src="${item.images[0]}" class="cart-img" alt="${item.name}">
                </div>
                <div class="col-lg-10 col-md-12 col-sm-12">
                  <div class="row height-100 d-flex align-items-center w-100">
                     <div class="col-lg-4 col-md-4 text-center text-md-start text-sm-center d-flex align-items-center">
                       <div class="card-title">${item.name}</div>
                     </div>
                     <div class="col-lg-2 col-md-2 text-center text-md-start text-sm-center">
                       <p class="card-text">${item.currency} ${item.cost}</p>
                     </div>
                     <div class="col-lg-2 col-md-2 text-center text-md-start text-sm-center">
                       <input type="number" class="cart-quantity" min="0" value="${item.quantity || 1}" data-index="${index}">
                     </div>
                     <div class="col-lg-2 col-md-3 text-center text-md-start text-sm-center">
                       <p class="subtotal" id="subtotal-${index}">${item.currency} ${(item.cost * (item.quantity || 1)).toFixed(2)}</p>
                     </div>
                     <div class="col-lg-2 col-md-1 text-lg-end text-md-center text-sm-center text-center">
                       <button class="btn btn-link text-secondary pe-ls-5 pe-md-0 ps-sm-0 pe-sm-0 elimiar-item" onclick="eliminarProducto(${index})">
                         <img src="img/papelera-de-reciclaje.png" alt="Eliminar" width="30">
                       </button>
                     </div>
                  </div>
                </div>
              </div>
            </div>`;
        });
        

      // Sección de tipos de envío
      cartContainer.innerHTML += `
        <div class="header row ms-1 me-1 ms-md-5 me-md-5 mb-3 mt-5 text-center fw-bold">
          <div class="col-md-4 header-etiquetas w-100">Tipo de envío</div>
        </div>

        <div class="header row ms-1 me-1 ms-md-5 me-md-5 mb-3 mt-5 text-center fw-bold">
          <div class="col-12 col-sm-4 mb-2">
            <label for="premium" class="w-md-100 w-100">
              <div class="p-3 cart-tipo-envio-radio">
                <input id="premium" type="radio" name="tipo" class="me-1">
                Premium 2 a 5 días (15%)
              </div>
            </label>
          </div>
          <div class="col-12 col-sm-4 mb-2">
            <label for="express" class="w-md-100 w-100">
              <div class="p-3 cart-tipo-envio-radio">
                <input id="express" type="radio" name="tipo" class="me-1">
                Express 5 a 8 días (7%)
              </div>
            </label>
          </div>
          <div class="col-12 col-sm-4 mb-2">
            <label for="Standard" class="w-md-100 w-100">
              <div class="p-3 cart-tipo-envio-radio">
                <input id="Standard" type="radio" name="tipo">
                Standard 12 a 15 días (5%)
              </div>
            </label>
          </div>
        </div>`;

      // Sección de dirección de envío
      cartContainer.innerHTML += `
        <div class="card mb-3 ms-1 me-1 ms-md-5 me-md-5 cart-item shadow-sm p-3 p-md-5">
          <div class="row g-0">
            <div class="col-md-12">
              <div class="row height-100 d-flex align-items-center">
                <div class="col-12 text-left mb-4">
                  <b>Dirección de envío:</b>
                </div>
                <div class="col-12 text-left mb-4">
                  <label for="departamento" class="mb-2">Departamento <span class="required">*</span></label>
                  <input type="text" class="form-control" id="departamento" placeholder="Ingrese su departamento" required>
                </div>
                <div class="col-12 text-left mb-4">
                  <label for="localidad" class="mb-2">Localidad <span class="required">*</span></label>
                  <input type="text" class="form-control" id="localidad" placeholder="Ingrese su localidad">
                </div>
                <div class="col-12 text-left mb-4"></div>
                <div class="col-12 text-left mb-4">
                  <label for="calle" class="mb-2">Calle <span class="required">*</span></label>
                  <input type="text" class="form-control" id="calle" placeholder="Ingrese su calle" required>
                </div>
                <div class="col-12 text-left mb-4">
                  <label for="numero" class="mb-2">Número <span class="required">*</span></label>
                  <input type="number" class="form-control" id="numero" placeholder="Número" required>
                </div>
                <div class="col-12 text-left mb-4">
                  <label for="esquina" class="mb-2">Esquina <span class="required">*</span></label>
                  <input type="text" class="form-control" id="esquina" placeholder="Esquina">
                </div>
                <div class="col-2 text-left mb-4"></div>
              </div>
            </div>
          </div>
        </div>`;

      // Sección de medios de pago
      cartContainer.innerHTML += `
        <div class="header row ms-1 me-1 ms-md-5 me-md-5 mb-3 mt-5 text-center fw-bold">
          <div class="col-md-4 header-etiquetas w-100">Medios de pago</div>
        </div>

        <div class="header row ms-1 me-1 ms-md-5 me-md-5 mb-3 mt-5 text-center fw-bold">
          <div class="col-12 col-md-6 mb-2">
            <label for="credito" class="w-md-100 w-100">
              <div class="p-4 cart-tipo-envio-radio">
                <input id="credito" type="radio" name="pago" class="me-1">
                Tarjeta de crédito
              </div>
            </label>
          </div>
          <div class="col-12 col-md-6 mb-2">
            <label for="banco" class="w-md-100 w-100">
              <div class="p-4 cart-tipo-envio-radio">
                <input id="banco" type="radio" name="pago" class="me-1">
                Transferencia bancaria
              </div>
            </label>
          </div>
        </div>`;
      
      // Sección de tarjeta de credito
      cartContainer.innerHTML += `
        <div class="card mb-3 ms-1 me-1 ms-md-5 me-md-5 cart-item shadow-sm p-3 p-md-5 d-none" id="tarjeta-credito">
          <div class="row g-0">
            <div class="col-md-12">
              <div class="row height-100 d-flex align-items-center">
                <div class="col-12 text-left mb-1">
                  <label for="tarjeta" class="mb-1">Numero de tarjeta <span class="required">*</span></label>
                  <input type="text" class="form-control" id="tarjeta" placeholder="Ingrese numero de tarjeta" required>
                </div>
                <div class="col-12 text-left mb-1">
                  <label for="titular" class="mb-1">Titular <span class="required">*</span></label>
                  <input type="text" class="form-control" id="titular" placeholder="Ingrese titular">
                </div>
                <div class="col-12 text-left mb-1"></div>
                <div class="col-12 text-left mb-1">
                  <label for="vencimiento" class="mb-1">Fecha de vencimiento <span class="required">*</span></label>
                  <input type="text" class="form-control" id="vencimiento" placeholder="Ingrese fecha de vencimiento" required>
                </div>
                <div class="col-12 text-left mb-1">
                  <label for="cvv" class="mb-1">CVV <span class="required">*</span></label>
                  <input type="number" class="form-control" id="cvv" placeholder="CVV" required>
                </div>
              </div>
            </div>
          </div>
        </div>
      `

      // Sección de cuenta bancaria
      cartContainer.innerHTML += `
        <div class="card mb-3 ms-1 me-1 ms-md-5 me-md-5 cart-item shadow-sm p-3 p-md-5 hidden d-none" id="cuenta-bancaria-seccion">
          <div class="row g-0">
            <div class="col-md-12">
              <label for="cuenta-bancaria" class="mb-1">Cuenta Bancaria</label>
              <textarea id="cuenta-bancaria" name="cuenta-bancaria" rows="5" cols="33" class="form-control" disabled="true" style="background-color: #fff;">
BANCO ITAÚ
9968761
SUC 25
LAND SA
              </textarea>
            </div>
          </div>
        </div>
      `
        
      // Sección de resumen de costos
      cartContainer.innerHTML += `
        <div class="card ms-1 me-1 ms-md-5 me-md-5 mb-3 mt-5 cart-item shadow-sm p-4">
          <div class="row g-0">
            <div class="col-md-12">
              <div class="row height-100 d-flex align-items-center">
                <div class="col-4 text-center" id="subtotal">
                  <b>Subtotal: $0.00</b>
                </div>
                <div class="col-4 text-center" id="costo-envio">
                  <b>Costo de envío: $0.00</b>
                </div>
                <div class="col-4 text-center" id="total-final">
                  <b>Total: $0.00</b>
                </div>
              </div>
            </div>
          </div>
        </div>`; 

      // Botón de finalizar compra
      const finalizarCompraBtn = document.createElement("button");
      finalizarCompraBtn.innerText = "Finalizar compra";
      finalizarCompraBtn.className = "btn btn-warning mt-3 finalizar-compra"; 
      //finalizarCompraBtn.style.width = "20%";
      //finalizarCompraBtn.style.marginLeft = "39%";

      finalizarCompraBtn.onclick = function() {
        // Validación de los campos de dirección
        const departamento = document.getElementById("departamento").value.trim();
        const calle = document.getElementById("calle").value.trim();
        const numero = document.getElementById("numero").value.trim();
        const esquina = document.getElementById("esquina").value.trim();

        //validacion de los campos
        if (!departamento || !calle || !numero || !esquina) {
          alert("Por favor, completa todos los campos de la dirección de envío.");
          return;
        }

        // Validación de la forma de envío
        const envioSeleccionado = document.querySelector("input[name='tipo']:checked");
        if (!envioSeleccionado) {
          alert("Por favor, selecciona un tipo de envío.");
          return;
        }

        // Validación de cantidad de productos
        const cantidades = document.querySelectorAll(".cart-quantity");
        for (let input of cantidades) {
          if (parseInt(input.value) <= 0) {
            alert("La cantidad de cada producto debe ser mayor a 0.");
            return;
          }
        }

        // Validación de la forma de pago
        const pagoSeleccionado = document.querySelector("input[name='pago']:checked"); //se selecciona una opcion
        if (!pagoSeleccionado) {
          alert("Por favor, selecciona una forma de pago.");
          return;
        }

        // Validación de los campos específicos de la forma de pago
        const camposPago = document.querySelectorAll(".campoPago");
        for (let campo of camposPago) {
          if (campo.value.trim() === "") {
            alert("Por favor, completa todos los campos de la forma de pago seleccionada.");
            return;
          }
        }

        // Si todas las validaciones son correctas, muestra mensaje de éxito
        alert("Compra realizada exitosamente. ¡Gracias por tu compra!");
      };
      cartContainer.appendChild(finalizarCompraBtn);

      // Mostrar u ocultar los campos de pago 
      const tarjetaCreditoRadio = document.getElementById("credito");
      const transferenciaRadio = document.getElementById("banco");

      const camposCredito = document.getElementById("tarjeta-credito");
      const camposTransferencia = document.getElementById("cuenta-bancaria-seccion");

      function mostrarCamposPago() {
        if (tarjetaCreditoRadio.checked) {
            camposCredito.classList.remove("d-none");
        } else {
            camposCredito.classList.add("d-none");
        }
    
        if (transferenciaRadio.checked) {
            camposTransferencia.classList.remove("d-none");
        } else {
            camposTransferencia.classList.add("d-none");
        }
    }
    

      tarjetaCreditoRadio.addEventListener("change", mostrarCamposPago);
      transferenciaRadio.addEventListener("change", mostrarCamposPago);

      // Llamar a la función de mostrar campos al cargar la página (si ya hay una opción seleccionada)
      mostrarCamposPago();    

      // Evento para actualizar subtotal y total cuando cambia la cantidad
      document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("input", function() {
          const index = input.getAttribute("data-index");
          const newQuantity = parseInt(input.value);
          cartItems[index].quantity = newQuantity;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          actualizarSubtotal(index, newQuantity, cartItems[index].cost, cartItems[index].currency);
          actualizarTotal();
          actualizarBadgeCarrito(); //Actualiza en tiempo real los totales
        });
      });

      // Evento para recalcular total cuando cambia el tipo de envío
      document.querySelectorAll("input[name='tipo']").forEach(radio => {
        radio.addEventListener("change", actualizarTotal);
      });

      actualizarTotal();
    } else {
      mostrarCarritoVacio(cartContainer);
    }
  }
});

function mostrarCarritoVacio(cartContainer) {
  cartContainer.innerHTML = `
    <div class="text-center" role="alert">
      <h4 class="alert-heading">Tu carrito está vacío</h4>
      <p>Agrega productos para verlos aquí.</p>
    </div>`;
}


// Definir la tasa de cambio (por ejemplo, 1 moneda local = 41 USD)
const tasaDeCambio = 41; // Suponiendo que estás trabajando con una moneda local

function convertirAPrecioEnDolares(costo, moneda) {
  // Convertir el precio a dólares si la moneda es diferente a USD
  if (moneda !== 'USD') {
    return costo / tasaDeCambio;
  }
  return costo; // Si ya está en USD, no hacer ninguna conversión
}

function actualizarSubtotal(index, quantity, cost, currency) {
  const subtotalElement = document.getElementById(`subtotal-${index}`);
  
  // Convertir el costo a dólares
  const costoEnDolares = convertirAPrecioEnDolares(cost, currency);
  
  // Calcular el subtotal en dólares
  const subtotal = quantity * costoEnDolares;
  
  // Mostrar el subtotal convertido
  subtotalElement.textContent = `USD ${subtotal.toFixed(2)}`;
}

function actualizarTotal() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let subtotal = 0;

  cartItems.forEach(item => {
    // Convertir cada precio a dólares antes de sumarlo al subtotal
    const costoEnDolares = convertirAPrecioEnDolares(item.cost, item.currency);
    subtotal += costoEnDolares * (item.quantity || 1);
  });

  const tipoEnvio = document.querySelector("input[name='tipo']:checked");
  let costoEnvio = 0;

  if (tipoEnvio) {
    switch (tipoEnvio.id) {
      case "premium":
        costoEnvio = subtotal * 0.15;
        break;
      case "express":
        costoEnvio = subtotal * 0.07;
        break;
      case "Standard":
        costoEnvio = subtotal * 0.05;
        break;
    }
  }

  const total = subtotal + costoEnvio;
  document.getElementById("subtotal").textContent = `Subtotal: USD ${subtotal.toFixed(2)}`;
  document.getElementById("costo-envio").textContent = `Costo de envío: USD ${costoEnvio.toFixed(2)}`;
  document.getElementById("total-final").textContent = `Total: USD ${total.toFixed(2)}`;

  // Actualizar el badge del carrito
  actualizarBadgeCarrito();
}

function eliminarProducto(index) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  document.getElementById(`cart-item-${index}`).remove();
  actualizarTotal();
}

// Función para actualizar el badge del carrito
function actualizarBadgeCarrito() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById("cartCountBadge").innerText = totalQuantity;
}

document.addEventListener("DOMContentLoaded", function() {
  actualizarBadgeCarrito();
});
