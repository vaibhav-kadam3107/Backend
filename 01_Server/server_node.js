const http = require('http');

const hostname = '127.0.0.1'
const port = 3000;

const server = http.createServer((req, res) => {
    if(req.url === '/test') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    } else if(req.url === '/login') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You can login now\n');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 - Page not found\n');
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})