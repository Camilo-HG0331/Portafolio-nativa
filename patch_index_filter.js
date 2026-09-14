const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add select box next to "Honestidad"
const navRegex = /(<li><a href="#">Honestidad<\/a><\/li>)\s*<\/ul>/;
if (html.match(navRegex)) {
    const filterSelect = `
                    <li><a href="#">Honestidad</a></li>
                    <li style="margin-left: 20px;">
                        <select id="category-filter" style="padding: 5px; border-radius: 5px; border: 1px solid #ccc; font-family: 'Raleway', sans-serif;">
                            <option value="all">Todas las categorías</option>
                            <option value="tes">Tés</option>
                            <option value="comida">Comida</option>
                            <option value="miel">Miel</option>
                            <option value="cuidado">Cuidado</option>
                        </select>
                    </li>
                </ul>
`;
    html = html.replace(navRegex, filterSelect.trim() + '\n                </ul>');
}

// 2. Add data-category to each box
const categories = {
    'portfolio-1.html': 'comida',
    'portfolio-2.html': 'miel',
    'portfolio-3.html': 'tes',
    'portfolio-4.html': 'miel',
    'portfolio-5.html': 'tes',
    'portfolio-6.html': 'cuidado',
    'portfolio-7.html': 'comida',
    'portfolio-8.html': 'comida',
    'portfolio-9.html': 'comida'
};

for (const [file, category] of Object.entries(categories)) {
    const boxRegex = new RegExp(`(<div class="box">\\s*<a href="${file}">)`);
    html = html.replace(boxRegex, `<div class="box" data-category="${category}">\n                    <a href="${file}">`);
}

// 3. Add JS script for filtering
const filterScript = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const filterSelect = document.getElementById('category-filter');
            if(filterSelect) {
                filterSelect.addEventListener('change', (e) => {
                    const selected = e.target.value;
                    const boxes = document.querySelectorAll('.portfolio-content .box');
                    
                    boxes.forEach(box => {
                        const category = box.getAttribute('data-category');
                        if (selected === 'all' || selected === category) {
                            box.style.display = 'block';
                        } else {
                            box.style.display = 'none';
                        }
                    });
                });
            }
        });
    </script>
</body>
`;

html = html.replace('</body>', filterScript);

fs.writeFileSync('index.html', html);
console.log('Filter applied');
