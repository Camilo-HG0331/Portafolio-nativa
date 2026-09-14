const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('/api/debug-env')) {
    const debugRoute = `
app.get('/api/debug-env', (req, res) => {
    res.json({
        hasUser: !!process.env.EMAIL_USER,
        user: process.env.EMAIL_USER,
        hasPass: !!process.env.EMAIL_PASS,
        passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
    });
});
`;
    code = code.replace("app.use(express.static(__dirname));", "app.use(express.static(__dirname));\n" + debugRoute);
    fs.writeFileSync('server.js', code);
    console.log("Debug route added");
}
