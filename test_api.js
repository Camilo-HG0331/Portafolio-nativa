const http = require('http');

const data = JSON.stringify({
    email: 'test@example.com',
    name: 'Test User',
    cart: [{name: 'Granola', price: 15000, quantity: 1}],
    total: 15000
});

const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/send-email',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}, res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => console.log('Response:', body));
});

req.on('error', e => console.error('Error:', e.message));
req.write(data);
req.end();
