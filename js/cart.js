let cart = JSON.parse(localStorage.getItem('nativa_cart')) || [];
let discountMultiplier = 1;

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

    const finalTotal = subtotal * discountMultiplier;
    const discountAmount = subtotal - finalTotal;

    let subtotalHtml = `${subtotal.toLocaleString('es-CO')}`;
    if (discountMultiplier < 1) {
        subtotalHtml += `<br><span style="color: green; font-size: 0.8em;">- ${discountAmount.toLocaleString('es-CO')} (20% dto)</span>`;
    }

    document.getElementById('checkout-subtotal').innerHTML = subtotalHtml;
    document.getElementById('checkout-total').innerText = `${finalTotal.toLocaleString('es-CO')} COP`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCheckout();
});

async function processPayment() {
    const btn = document.querySelector('.btn-checkout');
    const originalText = btn.innerHTML;
    
    // Get billing info
    const emailEl = document.getElementById('billing-email');
    const nameEl = document.getElementById('billing-name');
    
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    if (emailEl && !emailEl.value) {
        alert("Por favor, ingresa tu correo electrónico para enviarte la confirmación.");
        emailEl.focus();
        return;
    }

    btn.innerHTML = 'Procesando... <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    const email = emailEl ? emailEl.value : '';
    const name = nameEl ? nameEl.value : '';
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalTotal = total * discountMultiplier;

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, cart, total: finalTotal })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('¡Pago procesado con éxito! Hemos enviado un recibo a tu correo electrónico.');
        } else {
            // Even if the email fails, we might still clear the cart for now or warn the user.
            console.error('Error del servidor:', data.error);
            alert('Pago procesado, pero tuvimos un inconveniente enviando el recibo al correo: ' + data.error);
        }
    } catch (e) {
        console.error('Error procesando pago/correo:', e);
        alert('Pago procesado localmente, no se pudo conectar al servidor de correos.');
    }

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


function applyDiscount() {
    const code = document.getElementById('discount-code').value.trim();
    const msgEl = document.getElementById('discount-message');
    if (code === 'SAMUELCACHON') {
        discountMultiplier = 0.8; // 20% discount
        msgEl.innerText = '¡Código aplicado! 20% de descuento.';
        msgEl.style.color = 'green';
        msgEl.style.display = 'block';
    } else {
        discountMultiplier = 1;
        msgEl.innerText = 'Código inválido.';
        msgEl.style.color = 'red';
        msgEl.style.display = 'block';
    }
    renderCheckout();
}
