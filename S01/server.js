const http = require('http');

const server = http.createServer((request,response) => {

    response.statusCode = 200; //200 = OK
    response.setHeader('Content-Type', 'text/plain')
    response.end('YO LES GENS.');
    console.log(request);
});

server.listen(1337, '127.0.0.1', () =>{
    console.log('The serveur is doing the travaille');
})