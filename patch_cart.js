const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Replace the old span style with the new one
    content = content.replace(
        /<span id="cart-count" style="background: var\(--terracota\); border-radius: 50%; padding: 2px 6px; font-size: 12px;">0<\/span>/g,
        '<span id="cart-count" style="background: var(--terracota); border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">0</span>'
    );

    // Also just in case there are ones with slightly different spacing or inner text
    content = content.replace(
        /<span id="cart-count" style="[^"]*padding:[^"]*">.*?<\/span>/g,
        '<span id="cart-count" style="background: var(--terracota); border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">0</span>'
    );

    fs.writeFileSync(f, content);
});
console.log("Patched cart-count in HTMLs");
