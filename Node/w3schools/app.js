const fs = require('fs');
const http = require('http');


let myHtml;
fs.readFile('./index.html', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
    myHtml = data;
  })



http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(myHtml);
}).listen(8080);