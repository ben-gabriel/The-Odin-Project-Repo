const express = require('express');
const app = express();

// -------- Settings
app.set('view engine', 'ejs');
app.set('views', './Sessions/views');

app.use(express.urlencoded({extended: false}));

// -------- Routes
app.get('/', (req, res)=>{
    res.render('index.ejs');
});

app.get('/login', (req, res)=>{
    res.render('login.ejs');
});

app.get('/register', (req, res)=>{
    res.render('register.ejs');
});
app.post('/register', (req, res)=>{

});


// -------- Port
app.listen(2404);

// -------- -------- -------- --------
// -------- Database Emulator --------
let users = [];