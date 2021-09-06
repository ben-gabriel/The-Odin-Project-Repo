const fs = require('fs');
const http = require('http');
const url = require('url');

http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    let reqPath = req.url;
    console.log('requestes path ==== '+reqPath);
    if(reqPath == '/'){
        reqPath = '/index'
    }

    fs.readFile('.'+reqPath+'.html', function(err, data) {
        if (err) {
            console.log(err)
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        } 
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });

}).listen(8080);