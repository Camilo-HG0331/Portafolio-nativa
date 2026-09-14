const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');
code = code.replace("app.use(express.static(__dirname));\n});\n", "app.use(express.static(__dirname));\n");
fs.writeFileSync('server.js', code);
