const express = require('express');
const app = express();
const port = 2404;

const path = require('path');
const wdir = './ExpressJs'; // working directory

const fs = require('fs');

const ejs = require('ejs');

// -------- Middleware
app.use(express.urlencoded({extended:true})); // parse body

app.use((req, res, next)=>{
    console.log(req.originalUrl); // Logger
    next()   
});

// -------- Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// -------- Routes
app.get('/',(req, res)=>{    

    res.render('index', {postTitle: 'My very own post title'})

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