document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
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