const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'checkout.html');

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // Navbar update
    if (!content.includes('checkout.html')) {
        content = content.replace(
            /<li><a href="contact.html">Contact<\/a><\/li>/g,
            '<li><a href="contact.html">Contacto</a></li>\n                    <li><a href="checkout.html" class="cart-link" style="background: var(--verde-bosque); color: var(--blanco); border-radius: 20px; padding: 10px 20px; margin-left: 10px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-shopping-cart"></i> Carrito <span id="cart-count" style="background: var(--terracota); border-radius: 50%; padding: 2px 6px; font-size: 12px;">0</span></a></li>'
        );
    }

    // JS inject
    if (!content.includes('js/cart.js')) {
        content = content.replace(/<\/body>/, '<script src="js/cart.js"></script>\n</body>');
    }

    // Replace Contact button with Add to Cart in portfolio files
    if (f.startsWith('portfolio-')) {
        content = content.replace(
            /<a class="btn btn-light"[\s\n]*href="contact.html">Contact<\/a>/g,
            '<button class="btn btn-dark add-to-cart-btn" onclick="addToCartFromPage()" style="margin-top: 10px; width: 100%; border-radius: 8px; font-weight: bold; font-size: 1.1em; padding: 15px; cursor: pointer; transition: 0.3s;"><i class="fas fa-shopping-cart"></i> Añadir al carrito</button>'
        );
    }

    fs.writeFileSync(f, content);
});
console.log("Patched HTMLs");
