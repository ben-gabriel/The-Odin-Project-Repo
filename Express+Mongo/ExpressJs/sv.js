const express = require('express');
const app = express();
const port = 2404;

const path = require('path');
const wdir = './ExpressJs'; // working directory
const fs = require('fs');

const ejs = require('ejs');

// ------- Database
const {database,testFun} = require('./database');

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
    res.redirect('/page/1');
});

app.get('/style.css',(req, res)=>{    

    fs.readFile(wdir+'/style.css', function(error, content){
        res.set('Content-Type', 'text/css')
        res.send(content)
    });

});

app.get('/favicon.ico',(req, res)=>{    

    fs.readFile(wdir+'/favicon.ico', function(error, content){
        res.set('Content-Type', 'imgage/png')
        res.send(content)
    });

});


// -------- Routes-> express.Router()
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const pageRouter = require('./routes/page');
app.use('/page', pageRouter);

// -------- 404
app.use((req, res)=>{
    res.status(404).render('404');
    console.log('error? 404');
});

// -------- Port
app.listen(port);
console.log(`Server Listening in Port ${port}`);