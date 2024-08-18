document.addEventListener('DOMContentLoaded', () => {
    updateCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = button.getAttribute('data-product-price');
            addToCart(productId, productName, productPrice);
        });
    });
});

function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === parseInt(productId));

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: parseInt(productId), name: productName, price: parseFloat(productPrice), quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</p>
            </div>
        `;
    });

    cartTotal.textContent = `Total: ₹${total}`;
}
