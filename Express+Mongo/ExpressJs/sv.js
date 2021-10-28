const express = require('express');
const app = express();
const port = 2404;

const fs = require('fs');
const wdir = './ExpressJs';

app.use(express.urlencoded({extended:true}));

app.get('/',(req, res)=>{    

    fs.readFile(wdir+'/index.html', function(error, content){
        res.set('Content-Type', 'text/html')
        res.send(content)
    });

});

app.post('/', (req, res)=>{    
    console.log(req.body);

    res.redirect('/')

});


app.listen(port);
console.log(`Server Listening in Port ${port}`);