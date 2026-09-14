const fs = require('fs');

// Base prices to cycle through
const prices = [24900, 22900, 19900, 29900, 34900, 15900, 27900, 18900, 31900, 25900];

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('portfolio-') && f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Determine a price based on the filename number, fallback to index
    let numMatch = f.match(/portfolio-(\d+)\.html/);
    let idx = numMatch ? (parseInt(numMatch[1], 10) - 1) % prices.length : 0;
    let price = prices[idx];
    
    // Add Price to Project Info if not already there
    if (!content.includes('fa-tag')) {
        content = content.replace(
            /<li><i class="far fa-map"><\/i> &nbsp;Location: New York<\/li>/g,
            `<li><i class="far fa-map"></i> &nbsp;Ubicación: Colombia</li>\n          <li><i class="fas fa-tag"></i> &nbsp;Precio: $<span class="product-price" data-price="${price}">${price.toLocaleString('es-CO')}</span> COP</li>`
        );
    }
    
    fs.writeFileSync(f, content);
});

// Update cart.js to read from DOM
let cartJs = fs.readFileSync('js/cart.js', 'utf8');
cartJs = cartJs.replace(
    /const price = 24900 \+ \(name\.length \* 100\);/g,
    `const priceEl = document.querySelector('.product-price');
    const price = priceEl ? parseInt(priceEl.getAttribute('data-price'), 10) : (24900 + (name.length * 100));`
);
fs.writeFileSync('js/cart.js', cartJs);

console.log("Patched prices");
