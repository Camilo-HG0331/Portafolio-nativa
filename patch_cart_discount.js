const fs = require('fs');
let js = fs.readFileSync('js/cart.js', 'utf8');

// Add state for discount
const initialVarsStr = "let cart = JSON.parse(localStorage.getItem('nativa_cart')) || [];";
if (js.includes(initialVarsStr) && !js.includes("let discountMultiplier")) {
    js = js.replace(initialVarsStr, initialVarsStr + "\nlet discountMultiplier = 1;");
}

// Add applyDiscount function
const applyDiscountFn = `
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
`;

if (!js.includes('function applyDiscount')) {
    js += "\n" + applyDiscountFn;
}

// Update renderCheckout to use discount
const renderCheckoutBodyStr = `
    document.getElementById('checkout-subtotal').innerText = \`$\${subtotal.toLocaleString('es-CO')}\`;
    document.getElementById('checkout-total').innerText = \`$\${subtotal.toLocaleString('es-CO')} COP\`;
}
`;

const renderCheckoutBodyReplacementStr = `
    const finalTotal = subtotal * discountMultiplier;
    const discountAmount = subtotal - finalTotal;

    let subtotalHtml = \`$\${subtotal.toLocaleString('es-CO')}\`;
    if (discountMultiplier < 1) {
        subtotalHtml += \`<br><span style="color: green; font-size: 0.8em;">- $\${discountAmount.toLocaleString('es-CO')} (20% dto)</span>\`;
    }

    document.getElementById('checkout-subtotal').innerHTML = subtotalHtml;
    document.getElementById('checkout-total').innerText = \`$\${finalTotal.toLocaleString('es-CO')} COP\`;
}
`;
js = js.replace(renderCheckoutBodyStr, renderCheckoutBodyReplacementStr);

// Update processPayment to use discounted total
const totalCalcStr = "const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);";
const totalCalcReplacementStr = totalCalcStr + "\n    const finalTotal = total * discountMultiplier;";
js = js.replace(totalCalcStr, totalCalcReplacementStr);
js = js.replace(/body: JSON\.stringify\(\{ email, name, cart, total \}\)/, "body: JSON.stringify({ email, name, cart, total: finalTotal })");

fs.writeFileSync('js/cart.js', js);
console.log("cart.js patched for discount.");
