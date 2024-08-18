document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            cart.push({ name: productName, price: productPrice });
            alert(`${productName} added to cart.`);
            console.log('Cart:', cart);
        });
    });

    // Form submission handling
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('contact-form').reset();
    });

    // Section animations
    const featuresSection = document.getElementById('features');
    const featuredProductsSection = document.getElementById('featured-products');

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const featuresPosition = featuresSection.getBoundingClientRect().top;
        const productsPosition = featuredProductsSection.getBoundingClientRect().top;

        if (featuresPosition < windowHeight - 100) {
            featuresSection.classList.add('animate');
        }
        if (productsPosition < windowHeight - 100) {
            featuredProductsSection.classList.add('animate');
        }
    });
});
