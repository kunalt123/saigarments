document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    // Sample product data (you can dynamically add products from your store)
    const products = [
        { id: 1, name: 'Classic Skinny Jeans', price: 850, image: 'images/product1.jpg' },
        { id: 2, name: 'High-Rise Denim', price: 950, image: 'images/product2.jpg' },
        { id: 3, name: 'Ripped Jeans', price: 1050, image: 'images/product3.jpg' }
    ];

    // Function to render cart items
    function renderCart() {
        const cartContainer = document.querySelector('.cart-items');
        cartContainer.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            document.getElementById('cart-total').textContent = 'Total: ₹0';
            return;
        }

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <div class="cart-item-quantity">
                        <button class="quantity-decrease" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button class="quantity-increase" data-id="${item.id}">+</button>
                    </div>
                    <span class="cart-item-price">₹${item.price * item.quantity}</span>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        updateTotal();
    }

    // Function to update the total price
    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cart-total').textContent = `Total: ₹${total}`;
    }

    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);

            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            renderCart();
            alert(`${product.name} added to cart.`);
        });
    });

    // Quantity increase/decrease buttons
    document.querySelector('.cart-items').addEventListener('click', event => {
        if (event.target.classList.contains('quantity-increase')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const item = cart.find(i => i.id === productId);
            item.quantity++;
            renderCart();
        } else if (event.target.classList.contains('quantity-decrease')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const item = cart.find(i => i.id === productId);
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(cart.indexOf(item), 1);
            }
            renderCart();
        }
    });

    // Remove item functionality
    document.querySelector('.cart-items').addEventListener('click', event => {
        if (event.target.classList.contains('cart-item-remove')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const itemIndex = cart.findIndex(i => i.id === productId);
            cart.splice(itemIndex, 1);
            renderCart();
        }
    });

    // Initialize cart on page load
    renderCart();
});
