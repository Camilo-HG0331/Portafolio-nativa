const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // 1. Titles
    content = content.replace(/<title>Lorem Portfolio([^<]*)<\/title>/g, '<title>Nativa | Catálogo</title>');

    // 2. Navbar "Portfolio" -> "Catálogo"
    // Using regex to catch variants like Portfolio, Catalogo (without accent) in current or normal state
    content = content.replace(/>Portfolio<\/a>/g, '>Catálogo</a>');
    content = content.replace(/>Catalogo<\/a>/g, '>Catálogo</a>');

    // 3. Headers
    content = content.replace(/>Single Project<\/h1>/gi, '>Detalle del Producto</h1>');
    content = content.replace(/>Project Description<\/h4>/gi, '>Descripción del Producto</h4>');
    content = content.replace(/>Project Details<\/h4>/gi, '>Detalles del Producto</h4>');
    content = content.replace(/>Project Info<\/h4>/gi, '>Información Adicional</h4>');

    // 4. Lorem ipsum paragraphs (with dotall /s flag or whitespace matching to catch newlines)
    content = content.replace(/Lorem ipsum dolor sit amet, consectetur adipisicing elit\. Impedit obcaecati, hic delectus voluptatibus at velit perspiciatis iusto tenetur odit sunt nulla illum placeat officia incidunt culpa non maxime aliquid\. Magni pariatur laborum\s*amet magnam totam, eum esse fugit autem perferendis\./g, 
        'Descubre nuestra línea de productos naturales, elaborados con los mejores ingredientes para brindarte bienestar y armonía. Cada uno de nuestros artículos está pensado para cuidar de ti y del medio ambiente, ofreciendo una experiencia única y revitalizante.');
    
    content = content.replace(/Lorem ipsum dolor sit amet consectetur adipisicing elit\. Beatae commodi laborum cumque ipsa rem voluptas nobis optio sapiente\?/g,
        'Siente la naturaleza en cada uso y transforma tu rutina diaria con nuestra incomparable calidad artesanal.');
        
    content = content.replace(/Lorem ipsum dolor, sit amet consectetur adipisicing elit\. Sed quasi totam obcaecati dignissimos\. Vitae facilis id accusantium deleniti eos quod, blanditiis ipsam exercitationem reprehenderit qui saepe, unde dolore ipsum beatae\./g,
        'En Nativa nos enorgullecemos de utilizar procesos 100% sostenibles y empaques ecológicos. Este producto ha sido cuidadosamente formulado para garantizar la máxima frescura y aportar beneficios reales para tu cuerpo y mente, respetando el ciclo natural.');

    // 5. List items
    content = content.replace(/Client: Square Studio/g, 'Origen: Cultivo Orgánico');
    content = content.replace(/Skills: Branding/g, 'Categoría: Bienestar Natural');
    content = content.replace(/Date: Apr 28, 2020/g, 'Elaboración: Artesanal');
    
    // 6. Remaining Lorem ipsum fallbacks
    content = content.replace(/Lorem ipsum dolor sit amet consectetur adipisicing elit\./gi, 'Productos creados con el corazón de la naturaleza.');
    
    // 7. Footer
    content = content.replace(/Lorem Portfolio 2020/gi, 'Nativa Inc 2020');

    // Write back
    fs.writeFileSync(f, content);
});

console.log('Text replacement complete.');
