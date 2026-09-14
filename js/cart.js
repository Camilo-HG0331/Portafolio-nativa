let cart = JSON.parse(localStorage.getItem('nativa_cart')) || [];

function saveCart() {
    localStorage.setItem('nativa_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countEls = document.querySelectorAll('#cart-count');
    countEls.forEach(el => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        el.innerText = total;
    });
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }
    saveCart();
    
    // Feedback visual
    const btn = document.querySelector('.add-to-cart-btn');
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Añadido!';
        btn.style.backgroundColor = 'var(--verde-natural)';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = 'var(--terracota)';
        }, 2000);
    }
}

function addToCartFromPage() {
    const imgEl = document.querySelector('.box-portfolio img');
    let name = "Producto Nativa";
    if (imgEl && imgEl.alt) {
        name = imgEl.alt;
    } else {
        const titleMatch = document.title.match(/\|\s*(.*)/);
        if (titleMatch) name = titleMatch[1].trim();
    }
    
    // Assign generic price based on string length to make it deterministic but varied
    const priceEl = document.querySelector('.product-price');
    const price = priceEl ? parseInt(priceEl.getAttribute('data-price'), 10) : (24900 + (name.length * 100)); 
    const img = imgEl ? imgEl.getAttribute('src') : 'img/logo.png';
    const id = window.location.pathname.split('/').pop().replace('.html', '') || 'unknown';

    addToCart({ id, name, price, img, quantity: 1 });
}

function renderCheckout() {
    const summaryContainer = document.getElementById('checkout-items');
    if (!summaryContainer) return;

    summaryContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        summaryContainer.innerHTML = '<p style="text-align: center; color: #777;">Tu carrito está vacío.</p>';
        document.getElementById('checkout-subtotal').innerText = '$0';
        document.getElementById('checkout-total').innerText = '$0 COP';
        return;
    }

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        summaryContainer.innerHTML += `
            <div class="summary-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="summary-item-details">
                    <h5>${item.name}</h5>
                    <p>50 g</p>
                </div>
                <div class="summary-item-price">
                    <strong>$${item.price.toLocaleString('es-CO')}</strong>
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 5px; margin-top: 5px;">
                        <button onclick="updateQuantity('${item.id}', -1)" style="border: none; background: #eee; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">-</button>
                        <span style="font-size: 0.9em; width: 20px; text-align: center;">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)" style="border: none; background: #eee; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('checkout-subtotal').innerText = `$${subtotal.toLocaleString('es-CO')}`;
    document.getElementById('checkout-total').innerText = `$${subtotal.toLocaleString('es-CO')} COP`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCheckout();
});

function processPayment() {
    cart = [];
    saveCart();
    window.location.href = 'index.html';
}


function updateQuantity(id, change) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1); // Remove item if quantity goes to 0
        }
        saveCart();
        renderCheckout();
    }
}
