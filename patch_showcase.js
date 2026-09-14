const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('portfolio-') && f.endsWith('.html'));

const productNames = {
    'portfolio-1.html': 'Infusión Relax',
    'portfolio-2.html': 'Mascarilla Facial',
    'portfolio-3.html': 'Crema Hidratante',
    'portfolio-4.html': 'Jabón Artesanal',
    'portfolio-5.html': 'Aceite Esencial',
    'portfolio-6.html': 'Bálsamo Labial',
    'portfolio-7.html': 'Exfoliante Corporal',
    'portfolio-8.html': 'Champú Sólido',
    'portfolio-9.html': 'Loción Corporal',
    'portfolio-10.html': 'Nativa Té Vital'
};

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    const name = productNames[f] || 'Producto Nativa';
    
    // Replace Detalle del Producto with the actual name
    content = content.replace(/<h1 class="subpage">[^<]*<\/h1>/gi, `<h1 class="subpage">${name}</h1>`);
    
    // Remove "This is a creative portfolio"
    content = content.replace(/<p class="large">This is a creative portfolio<\/p>/gi, '');
    
    // Write back
    fs.writeFileSync(f, content);
});

console.log('Showcase patched.');
