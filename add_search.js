const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add search input next to category filter
const filterRegex = /(<select id="category-filter"[\s\S]*?<\/select>\s*<\/li>)/;
if (html.match(filterRegex)) {
    const searchInput = `
                    <li style="margin-left: 10px;">
                        <div style="position: relative;">
                            <input type="text" id="product-search" placeholder="Buscar producto..." style="padding: 5px 10px 5px 30px; border-radius: 5px; border: 1px solid #ccc; font-family: 'Raleway', sans-serif; width: 200px;">
                            <i class="fas fa-search" style="position: absolute; left: 10px; top: 9px; color: #888; font-size: 0.9em;"></i>
                        </div>
                    </li>
`;
    html = html.replace(filterRegex, '$1' + searchInput);
}

// Add data-name attributes to boxes
const names = {
    'portfolio-1.html': 'Granola Artesanal',
    'portfolio-2.html': 'Miel de Montaña',
    'portfolio-3.html': 'Infusión Relax',
    'portfolio-4.html': 'Miel Vital con Jengibre',
    'portfolio-5.html': 'Infusión Sueño Nativo',
    'portfolio-6.html': 'Jabón Natural de Aloe Vera',
    'portfolio-7.html': 'Mermelada de Frutos del Bosque',
    'portfolio-8.html': 'Barra Energética Nativa',
    'portfolio-9.html': 'Hierbas Aromáticas Nativa'
};

for (const [file, name] of Object.entries(names)) {
    const boxRegex = new RegExp(`(<div class="box"[^>]*>\\s*<a href="${file}">)`);
    html = html.replace(boxRegex, (match) => {
        return match.replace('<div class="box"', `<div class="box" data-name="${name.toLowerCase()}"`);
    });
}

// Replace existing script
const oldScriptRegex = /<script>[\s\S]*?const filterSelect = document\.getElementById\('category-filter'\);[\s\S]*?<\/script>/;

const newScript = `<script>
        document.addEventListener('DOMContentLoaded', () => {
            const filterSelect = document.getElementById('category-filter');
            const searchInput = document.getElementById('product-search');
            
            function filterProducts() {
                const selected = filterSelect ? filterSelect.value : 'all';
                const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
                const boxes = document.querySelectorAll('.portfolio-content .box');
                
                boxes.forEach(box => {
                    const category = box.getAttribute('data-category');
                    const name = box.getAttribute('data-name') || '';
                    
                    const matchesCategory = (selected === 'all' || selected === category);
                    const matchesSearch = (searchTerm === '' || name.includes(searchTerm));
                    
                    if (matchesCategory && matchesSearch) {
                        box.style.display = 'block';
                    } else {
                        box.style.display = 'none';
                    }
                });
            }

            if(filterSelect) filterSelect.addEventListener('change', filterProducts);
            if(searchInput) searchInput.addEventListener('input', filterProducts);
        });
    </script>`;

html = html.replace(oldScriptRegex, newScript);

fs.writeFileSync('index.html', html);
console.log('Search added');
