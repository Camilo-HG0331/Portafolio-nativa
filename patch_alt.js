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
        // Add alt text to the image
        content = content.replace(/<img src="img\/portfolio\/([^"]+)" alt="">/gi, `<img src="img/portfolio/$1" alt="${name}">`);
        
        // Also update the title to include the product name
        content = content.replace(/<title>Nativa \| Catálogo<\/title>/gi, `<title>Nativa | ${name}</title>`);
        
        fs.writeFileSync(f, content);
    }
});

console.log('Alt attributes and titles patched.');
