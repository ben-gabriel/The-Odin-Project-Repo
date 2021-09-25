const fs = require('fs');
const http = require('http');


http.createServer((req, res)=>{
    
    let requestedPath = req.url;
    console.log('requested path ==== '+requestedPath);

    if(requestedPath == '/'){
        requestedPath = '/index'
    }

    fs.readFile('.'+requestedPath+'.html', function(err, data) {
        
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
            
            fs.readFile('./404.html', (err, data)=>{
                if (err){
                    console.log(err);
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end('404 Page Not Found');   
                }
                else{
                    res.write(data);
                    res.end();
                }    
            });
        } 
        
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }

    });

}).listen(8080);