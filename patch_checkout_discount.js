const fs = require('fs');
let html = fs.readFileSync('checkout.html', 'utf8');

const targetStr = `
              <div style="border-top: 1px solid #ddd; margin: 25px 0; padding-top: 25px; display: flex; justify-content: space-between; align-items: center; color: var(--verde-bosque); cursor: pointer;">
                  <span style="font-size: 0.9em;">¿Tienes un código de descuento?</span>
                  <i class="fas fa-chevron-down"></i>
              </div>
`;

const replacementStr = `
              <div style="border-top: 1px solid #ddd; margin: 25px 0; padding-top: 25px; display: flex; flex-direction: column; color: var(--verde-bosque);">
                  <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; margin-bottom: 10px;" onclick="document.getElementById('discount-container').style.display = document.getElementById('discount-container').style.display === 'none' ? 'flex' : 'none'">
                      <span style="font-size: 0.9em;">¿Tienes un código de descuento?</span>
                      <i class="fas fa-chevron-down"></i>
                  </div>
                  <div id="discount-container" style="display: flex; gap: 10px;">
                      <input type="text" id="discount-code" placeholder="Código" style="flex: 1; padding: 10px; border-radius: 5px; border: 1px solid #ccc;">
                      <button type="button" onclick="applyDiscount()" style="background: var(--verde-bosque); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Aplicar</button>
                  </div>
                  <div id="discount-message" style="margin-top: 5px; font-size: 0.85em; display: none;"></div>
              </div>
`;

html = html.replace(targetStr, replacementStr);
fs.writeFileSync('checkout.html', html);
console.log("Checkout HTML patched for discount code.");
