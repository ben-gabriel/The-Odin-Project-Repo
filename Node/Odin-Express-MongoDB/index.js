const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 2404
    
let dataVar = fs.readFile('./index.html', (error, data)=>{
        console.log('-----data = ',data);
});
    
app.get('/', (req, res)=> {
    // res.sendFile(path.join(__dirname,'/index.html'));

    res.set('content-type', 'text/html')

    fs.readFile('./index.html', (error, data)=>{
        res.send(data);
    });

});

app.listen(port, ()=>{
    console.log('Server Listening in Port: ',port);
});