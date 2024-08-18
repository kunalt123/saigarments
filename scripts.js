// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Add to cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Display cart items
function displayCart() {
    let cartItems = document.getElementById('cart-items');
    let total = 0;
    cartItems.innerHTML = '';
    cart.forEach(item => {
        cartItems.innerHTML += `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
        total += item.price;
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// On page load for cart page
if (document.getElementById('cart-items')) {
    displayCart();
}
