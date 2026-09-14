const fs = require('fs');
let content = fs.readFileSync('portfolio-6.html', 'utf8');

const p1Regex = /<p>Limpia e hidrata tu piel profundamente con nuestro Jabón Natural de Aloe Vera\. Elaborado mediante el método de saponificación en frío, conserva las bondades hidratantes y regeneradoras del extracto puro de sábila\.<\/p>/;

if (content.match(p1Regex) && !content.includes('Su espuma suave y cremosa elimina las impurezas sin resecar')) {
    content = content.replace(p1Regex, 
        `<p>Limpia e hidrata tu piel profundamente con nuestro Jabón Natural de Aloe Vera. Elaborado mediante el método de saponificación en frío, conserva las bondades hidratantes y regeneradoras del extracto puro de sábila.</p>\n                <p>Su espuma suave y cremosa elimina las impurezas sin resecar, dejando un fresco aroma natural y una sensación de tersura incomparable en tu cuerpo y rostro.</p>`
    );
}

fs.writeFileSync('portfolio-6.html', content);
console.log('Fixed portfolio 6');
