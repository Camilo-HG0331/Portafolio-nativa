const fs = require('fs');

let content = fs.readFileSync('js/cart.js', 'utf8');

// Replace the quantity display in renderCheckout with an input field
const oldRenderBlock = `                    <p>Cant: \${item.quantity}</p>`;
const newRenderBlock = `                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 5px; margin-top: 5px;">
                        <button onclick="updateQuantity('\${item.id}', -1)" style="border: none; background: #eee; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">-</button>
                        <span style="font-size: 0.9em; width: 20px; text-align: center;">\${item.quantity}</span>
                        <button onclick="updateQuantity('\${item.id}', 1)" style="border: none; background: #eee; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">+</button>
                    </div>`;

if (content.includes(oldRenderBlock)) {
    content = content.replace(oldRenderBlock, newRenderBlock);
}

// Add the updateQuantity function
const updateQuantityFunc = `

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
`;

if (!content.includes('function updateQuantity')) {
    content += updateQuantityFunc;
}

fs.writeFileSync('js/cart.js', content);
console.log("Patched cart.js for quantity changes");
