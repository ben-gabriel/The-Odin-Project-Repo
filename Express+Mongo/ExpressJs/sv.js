const express = require('express');
const app = express();
const port = 2404;

const path = require('path');
const wdir = './ExpressJs'; // working directory
const fs = require('fs');

const ejs = require('ejs');

// ------- Database
const {database} = require('./database');

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
    
    database.findManyDocuments(2).then((postData)=>{
            res.render('index', {postData});
    });

});

app.get('/style.css',(req, res)=>{    

    fs.readFile(wdir+'/style.css', function(error, content){
        res.set('Content-Type', 'text/css')
        res.send(content)
    });

});


// express.Router()
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

app.listen(port);
console.log(`Server Listening in Port ${port}`);

app.use((req, res)=>{
    res.status(404).render('404');
    console.log('error? 404');
});
