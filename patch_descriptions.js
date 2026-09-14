const fs = require('fs');

const descriptions = {
    'portfolio-1.html': {
        p1: 'Comienza tus mañanas con la energía y nutrición de nuestra Granola Artesanal. Elaborada cuidadosamente con una mezcla balanceada de avena crujiente, almendras, nueces y semillas, endulzada naturalmente para darte ese toque perfecto sin excesos.',
        p2: 'Ideal para acompañar tu yogur favorito, leche o fruta fresca, brindándote la fibra y las vitaminas necesarias para un desayuno completo y saludable.',
        p3: 'Nuestra granola es horneada en pequeños lotes para garantizar su frescura y textura crujiente inigualable. No contiene conservantes ni saborizantes artificiales, manteniendo la pureza de cada ingrediente directamente desde el campo a tu mesa.'
    },
    'portfolio-2.html': {
        p1: 'Disfruta de la pureza y el sabor inconfundible de nuestra Miel de Montaña. Recolectada por apicultores locales en zonas altas y libres de contaminación, esta miel cruda conserva todas sus propiedades enzimáticas y antioxidantes.',
        p2: 'Con un color ámbar profundo y notas florales intensas, es el endulzante perfecto para tus bebidas, postres o para tomarla sola como un remedio natural reconfortante.',
        p3: 'Nuestro proceso de extracción en frío asegura que la miel no pierda su valor nutricional. Al elegir este producto, apoyas la conservación de las abejas y promueves un ecosistema sostenible y equilibrado en nuestras montañas.'
    },
    'portfolio-3.html': {
        p1: 'Encuentra tu momento de paz con la Infusión Relax. Una mezcla selecta de hierbas calmantes como la manzanilla, la melisa y la flor de tilo, diseñadas para ayudarte a liberar el estrés acumulado del día a día.',
        p2: 'Cada sorbo te envuelve en un aroma floral suave que relaja los sentidos y prepara tu cuerpo para un estado de tranquilidad profunda y restauradora.',
        p3: 'Todas nuestras hierbas son cultivadas de manera orgánica, secadas a la sombra para preservar sus aceites esenciales intactos. Viene en empaques biodegradables, asegurando que tu momento de calma también sea amable con el planeta.'
    },
    'portfolio-4.html': {
        p1: 'Eleva tus defensas y revitaliza tu cuerpo con nuestra Miel Vital con Jengibre. Hemos combinado nuestra mejor miel cruda con extracto puro de jengibre para crear un poderoso aliado natural contra el resfriado y la fatiga.',
        p2: 'El dulce néctar se equilibra perfectamente con el toque picante y cálido del jengibre, ideal para disolver en agua caliente o té durante los días fríos.',
        p3: 'El jengibre fresco es macerado lentamente en la miel, un proceso artesanal que permite la transferencia total de sus propiedades antiinflamatorias y digestivas. Un frasco lleno de energía y salud puramente natural.'
    },
    'portfolio-5.html': {
        p1: 'Prepara tu cuerpo para un descanso profundo con la Infusión Sueño Nativo. Formulada con una mezcla botánica de lavanda, valeriana y pasiflora, esta infusión es tu mejor ritual antes de ir a la cama.',
        p2: 'Sus propiedades sedantes naturales calman el sistema nervioso, ayudándote a conciliar un sueño reparador y despertar con total vitalidad al día siguiente.',
        p3: 'Recolectamos las flores y hojas en su punto máximo de madurez bajo estrictos estándares orgánicos. Sin cafeína y sin aditivos, es una bebida 100% segura y natural para mejorar tu calidad de sueño de forma holística.'
    },
    'portfolio-6.html': {
        p1: 'Limpia e hidrata tu piel profundamente con nuestro Jabón Natural de Aloe Vera. Elaborado mediante el método de saponificación en frío, conserva las bondades hidratantes y regeneradoras del extracto puro de sábila.',
        p2: 'Su espuma suave y cremosa elimina las impurezas sin resecar, dejando un fresco aroma natural y una sensación de tersura incomparable en tu cuerpo y rostro.',
        p3: 'Libre de sulfatos, parabenos y fragancias sintéticas. Utilizamos aceites vegetales de alta calidad que respetan el pH natural de tu piel y garantizan que el agua que regresa a la naturaleza esté libre de químicos tóxicos.'
    },
    'portfolio-7.html': {
        p1: 'Deleita tu paladar con la Mermelada de Frutos del Bosque, una explosión de sabor 100% natural. Preparada con fresas, moras y arándanos frescos, cocidos a fuego lento para realzar su dulzor natural.',
        p2: 'Perfecta para untar en pan tostado, acompañar quesos, o darle un toque especial a tus postres, con verdaderos trozos de fruta que sentirás en cada bocado.',
        p3: 'No utilizamos pectina artificial ni exceso de azúcares refinados. Esta mermelada es un homenaje a las recetas tradicionales de la abuela, envasada al vacío en frascos de vidrio reutilizables para garantizar su frescura.'
    },
    'portfolio-8.html': {
        p1: 'Recarga tu energía en cualquier momento con la Barra Energética Nativa. Un snack saludable y compacto elaborado con dátiles, cacao puro, almendras y un toque de coco rallado.',
        p2: 'Es el compañero ideal para tus rutinas de ejercicio, caminatas en la montaña o como un tentempié a media mañana que saciará tus antojos de manera nutritiva y deliciosa.',
        p3: 'Sin azúcares añadidos, su dulzor proviene exclusivamente de las frutas secas. Cada barra es prensada en frío, preservando intactos los minerales y la energía vital de sus ingredientes crudos.'
    },
    'portfolio-9.html': {
        p1: 'Añade el toque mágico a tus comidas con nuestro mix de Hierbas Aromáticas Nativa. Una selección gourmet de romero, tomillo, orégano y albahaca, cultivados bajo el sol y secados cuidadosamente.',
        p2: 'Su aroma intenso y sabor concentrado transformarán tus salsas, guisos y asados, llevando la frescura del huerto directamente a tu cocina.',
        p3: 'Nuestras hierbas crecen en suelos ricos y sin pesticidas. El proceso de deshidratación lenta asegura que conserven sus vibrantes colores y potentes aceites esenciales, empaquetadas en un envase hermético para prolongar su vida útil.'
    },
    'portfolio-10.html': {
        p1: 'Activa tu metabolismo y purifica tu organismo con el Nativa Té Vital. Una infusión desintoxicante a base de té verde, hojas de sen, y un sutil toque de limón y menta fresca.',
        p2: 'Su efecto antioxidante y diurético te ayuda a sentirte más ligero y lleno de energía durante todo el día, siendo el complemento ideal para una dieta equilibrada.',
        p3: 'Seleccionamos las mejores hojas de té de cultivos éticos. La combinación de ingredientes ha sido formulada por expertos para ofrecer un equilibrio perfecto entre salud y un sabor refrescante que disfrutarás frío o caliente.'
    }
};

// Generic regex patterns for the current text
const regexP1 = /<p>Descubre nuestra línea de productos naturales, elaborados con los mejores ingredientes para brindarte bienestar y armonía\. Cada uno de nuestros artículos está pensado para cuidar de ti y del medio ambiente, ofreciendo una experiencia única y revitalizante\.<\/p>/;
const regexP2 = /<p>Siente la naturaleza en cada uso y transforma tu rutina diaria con nuestra incomparable calidad artesanal\.<\/p>/;
const regexP3 = /<p>En Nativa nos enorgullecemos de utilizar procesos 100% sostenibles y empaques ecológicos\. Este producto ha sido cuidadosamente formulado para garantizar la máxima frescura y aportar beneficios reales para tu cuerpo y mente, respetando el ciclo natural\.<\/p>/;
const regexP6P1 = /<p>Disfruta de una limpieza suave y un cuidado natural para tu piel\. Elaborado con aloe vera, ideal para tu rutina diaria\. ¡Bienestar natural en cada baño!<\/p>/;


const files = Object.keys(descriptions);

files.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        const desc = descriptions[f];
        
        // P1
        if (content.match(regexP1)) {
            content = content.replace(regexP1, `<p>${desc.p1}</p>`);
        } else if (f === 'portfolio-6.html' && content.match(regexP6P1)) {
            content = content.replace(regexP6P1, `<p>${desc.p1}</p>`);
        }
        
        // P2
        if (content.match(regexP2)) {
            content = content.replace(regexP2, `<p>${desc.p2}</p>`);
        }
        // Portfolio 6 didn't have P2 in the last diff. Wait, it only had 1 paragraph in description. 
        // Let's just insert P2 after P1 if not present, but it might be easier to replace the entire <div class="box-portfolio"> block.
        
        // P3
        if (content.match(regexP3)) {
            content = content.replace(regexP3, `<p>${desc.p3}</p>`);
        }

        fs.writeFileSync(f, content);
    }
});

console.log('Custom descriptions applied.');
