const fs = require('fs');

const serverCode = `require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/send-email', async (req, res) => {
    const { email, name, cart, total } = req.body;
    
    if (!email) {
        return res.status(400).json({ success: false, message: 'El correo electrónico es requerido' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change this or use SMTP host
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        let itemsHtml = (cart || []).map(item => \`<li>\${item.quantity}x \${item.name} - $\${(item.price * item.quantity).toLocaleString('es-CO')}</li>\`).join('');

        const mailOptions = {
            from: process.env.EMAIL_USER || '"Nativa" <no-reply@nativa.com>',
            to: email,
            subject: 'Confirmación de tu pedido en Nativa',
            html: \`
                <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
                    <h2 style="color: #4a7c59;">¡Gracias por tu compra, \${name || 'Cliente'}!</h2>
                    <p>Hemos recibido tu pedido correctamente. A continuación, te mostramos el resumen:</p>
                    <ul style="background: #f4f4f4; padding: 20px; border-radius: 8px; list-style: none;">
                        \${itemsHtml}
                    </ul>
                    <h3 style="color: #333;">Total a pagar: $\${total.toLocaleString('es-CO')} COP</h3>
                    <p>Gracias por apoyar el consumo responsable y los productos naturales.</p>
                </div>
            \`
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('Error enviando correo:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Server running on http://0.0.0.0:\${PORT}\`);
});
`;

fs.writeFileSync('server.js', serverCode);

// Add IDs to checkout.html
let checkout = fs.readFileSync('checkout.html', 'utf8');
checkout = checkout.replace(
    /<input type="text" placeholder="Escribe tu nombre completo">/,
    '<input type="text" id="billing-name" placeholder="Escribe tu nombre completo">'
);
checkout = checkout.replace(
    /<input type="email" placeholder="ejemplo@correo.com">/,
    '<input type="email" id="billing-email" placeholder="ejemplo@correo.com">'
);
fs.writeFileSync('checkout.html', checkout);

console.log("Updated server and checkout");
