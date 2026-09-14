const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const debugRoute2 = `
app.get('/api/debug-env-all', (req, res) => {
    res.json(Object.keys(process.env).filter(k => k.includes('EMAIL') || k.includes('USER') || k.includes('PASS')));
});
`;
code = code.replace("app.use(express.static(__dirname));", "app.use(express.static(__dirname));\n" + debugRoute2);
fs.writeFileSync('server.js', code);
