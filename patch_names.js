const fs = require('fs');

const productNames = {
    'portfolio-1.html': 'Granola Artesanal',
    'portfolio-2.html': 'Miel de Montaña',
    'portfolio-3.html': 'Infusión Relax',
    'portfolio-4.html': 'Miel Vital con Jengibre',
    'portfolio-5.html': 'Infusión Sueño Nativo',
    'portfolio-6.html': 'Jabón Natural de Aloe Vera',
    'portfolio-7.html': 'Mermelada de Frutos del Bosque',
    'portfolio-8.html': 'Barra Energética Nativa',
    'portfolio-9.html': 'Hierbas Aromáticas Nativa',
    'portfolio-10.html': 'Nativa Té Vital'
};

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('portfolio-') && f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    const name = productNames[f];
    
    if (name) {
        // Replace whatever is currently in <h1 class="subpage">...</h1>
        content = content.replace(/<h1 class="subpage">[^<]*<\/h1>/gi, `<h1 class="subpage">${name}</h1>`);
        fs.writeFileSync(f, content);
    }
});

console.log('Product names patched from images.');
