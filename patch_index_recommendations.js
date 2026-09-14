const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const otherProductsHtml = `
            <div id="other-products-section" style="display: none; clear: both; padding-top: 40px;">
                <h2 style="text-align: center; color: var(--verde-bosque); margin-bottom: 20px; font-family: 'Raleway', sans-serif;">También podría interesarte</h2>
                <div id="other-products-container" class="portfolio-content" style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;"></div>
            </div>
        </div>
    </section>
`;

html = html.replace(/<\/div>\s*<\/section>/, otherProductsHtml);

const newScript = `<script>
        document.addEventListener('DOMContentLoaded', () => {
            const filterSelect = document.getElementById('category-filter');
            const searchInput = document.getElementById('product-search');
            const otherSection = document.getElementById('other-products-section');
            const otherContainer = document.getElementById('other-products-container');
            
            function filterProducts() {
                const selected = filterSelect ? filterSelect.value : 'all';
                const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
                // Only select the original boxes, not the cloned ones
                const boxes = document.querySelectorAll('#portfolio > .container > .portfolio-content > .box');
                
                let isFiltering = (selected !== 'all' || searchTerm !== '');
                let otherProductsPool = [];
                
                boxes.forEach(box => {
                    const category = box.getAttribute('data-category');
                    const name = box.getAttribute('data-name') || '';
                    
                    const matchesCategory = (selected === 'all' || selected === category);
                    const matchesSearch = (searchTerm === '' || name.includes(searchTerm));
                    
                    if (matchesCategory && matchesSearch) {
                        box.style.display = 'block';
                    } else {
                        box.style.display = 'none';
                        // Add to pool of other products if we are filtering
                        if (isFiltering && (!matchesCategory || !matchesSearch)) {
                            otherProductsPool.push(box);
                        }
                    }
                });
                
                if (isFiltering && otherProductsPool.length > 0) {
                    otherContainer.innerHTML = ''; // Clear previous
                    // Shuffle pool and take up to 3
                    const shuffled = otherProductsPool.sort(() => 0.5 - Math.random());
                    const selectedOthers = shuffled.slice(0, 3);
                    
                    selectedOthers.forEach(b => {
                        const clone = b.cloneNode(true);
                        clone.style.display = 'block';
                        clone.style.width = '300px'; // fixed width for horizontal display
                        clone.style.float = 'none';
                        otherContainer.appendChild(clone);
                    });
                    otherSection.style.display = 'block';
                } else {
                    otherSection.style.display = 'none';
                    otherContainer.innerHTML = '';
                }
            }

            if(filterSelect) filterSelect.addEventListener('change', filterProducts);
            if(searchInput) searchInput.addEventListener('input', filterProducts);
        });
    </script>`;

const oldScriptRegex = /<script>[\s\S]*?<\/script>/;
html = html.replace(oldScriptRegex, newScript);

fs.writeFileSync('index.html', html);
console.log('Recommendations added');
