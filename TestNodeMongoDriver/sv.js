const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 2404
    
app.get('/', (req, res)=> {
    // res.sendFile(path.join(__dirname,'/index.html'));

    res.set('content-type', 'text/html')

    fs.readFile('./index.html', (error, data)=>{
        res.send(data);
    });

});

app.use(express.urlencoded({extended:false}));

app.post('/postAction', (req, res)=>{


    console.log('req.body: ', req.body);
    console.log('req.body.name: ', req.body.name);
    console.log('req.body.age: ', req.body.age);

    res.set('content-type', 'text/html');
    
    res.redirect('/');

});

app.listen(port, ()=>{
    console.log('Server Listening in Port: ',port);
});