const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /<div class="box" data-category="comida">\s*<a href="portfolio-9\.html">/g,
    '<div class="box" data-category="tes">\n                    <a href="portfolio-9.html">'
);

fs.writeFileSync('index.html', html);
console.log('Category updated');
