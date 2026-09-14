const fs = require('fs');
let cartJs = fs.readFileSync('js/cart.js', 'utf8');

const newProcessPayment = `
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

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, cart, total })
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
`;

cartJs = cartJs.replace(/function processPayment\(\) \{[\s\S]*?window\.location\.href = 'index\.html';\n\}/, newProcessPayment.trim());

fs.writeFileSync('js/cart.js', cartJs);
console.log("Cart updated");
