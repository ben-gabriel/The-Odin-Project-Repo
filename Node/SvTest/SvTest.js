const fs = require('fs');
const http = require('http');
const path = require('path');
const PORT = 2404;

console.log('------------------------------------------------------------')
console.log('Current Working Directory: ', process.cwd());
console.log('__dirname = ', __dirname);
console.log(' ')
console.log('Server Listening in port: ', PORT);
console.log(' ')

http.createServer((request, response)=>{

    console.log('request.url = ', request.url);

    let filePath = '.'+request.url;
    if(filePath == './'){
        filePath = './index.html';
    }

    let requestExtname = path.extname(filePath);
    console.log('requestExtname = ', requestExtname);
    console.log('filePath = ', filePath);
    console.log(' ');

    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.ico': 'image/ico',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    fs.readFile(filePath, (error, data)=>{
        if(error){
            console.log('Error: ', error);
        }
        else{
            response.writeHead(200, {'Content-Type': mimeTypes[requestExtname]});
            response.write(data);
            response.end();
        }
    });


}).listen(PORT);
