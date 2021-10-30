const express = require('express');
const app = express();
const port = 2404;

const fs = require('fs');
const { nextTick } = require('process');
const wdir = './ExpressJs'; // working directory


app.use(express.urlencoded({extended:true})); // middleware to parse body
app.use((req, res, next)=>{
    console.log(req.originalUrl);
    next()   
});


app.get('/',(req, res)=>{    

    fs.readFile(wdir+'/index.html', function(error, content){
        res.set('Content-Type', 'text/html')
        res.send(content)
    });

});
app.get('/style.css',(req, res)=>{    

    fs.readFile(wdir+'/style.css', function(error, content){
        res.set('Content-Type', 'text/css')
        res.send(content)
    });

});

app.post('/', (req, res)=>{    
    console.log(req.body);

    res.redirect('/')

});


app.listen(port);
console.log(`Server Listening in Port ${port}`);