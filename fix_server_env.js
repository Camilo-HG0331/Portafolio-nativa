const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

code = code.replace(/process\.env\.EMAIL_USER/g, "(process.env.EMAIL_USER || process.env.SMTP_USER)");
code = code.replace(/process\.env\.EMAIL_PASS/g, "(process.env.EMAIL_PASS || process.env.SMTP_PASS)");

// Remove the debug routes as they are no longer needed
code = code.replace(/app\.get\('\/api\/debug-env-all'[\s\S]*?\}\);/g, '');
code = code.replace(/app\.get\('\/api\/debug-env'[\s\S]*?\}\);/g, '');

fs.writeFileSync('server.js', code);
console.log("Server environment variables fixed");
