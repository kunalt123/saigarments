document.addEventListener('DOMContentLoaded', () => {
    updateCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
});

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === parseInt(productId));

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: parseInt(productId), quantity: 1 });
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
        const product = {
            1: { name: 'Classic Skinny Jeans', price: 850 },
            2: { name: 'High-Rise Denim', price: 950 },
            3: { name: 'Ripped Jeans', price: 1050 }
        }[item.id];

        if (product) {
            total += product.price * item.quantity;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <p>${product.name} x ${item.quantity} - ₹${product.price * item.quantity}</p>
                </div>
            `;
        }
    });

    cartTotal.textContent = `Total: ₹${total}`;
}
