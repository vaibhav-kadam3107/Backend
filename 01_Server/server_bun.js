import Bun from 'bun'; 

Bun.serve({
    fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === '/') {
            return new Response('Hello World - from bun');
        } else if (url.pathname === '/login') {
            return new Response('You can login now');
        } else {
            return new Response('404 - Page not found', { status: 404 });
        }
    },
    port: 3000,
    hostname: '127.0.0.1'
});
