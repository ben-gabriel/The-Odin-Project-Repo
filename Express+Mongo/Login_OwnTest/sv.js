const express = require('express');
const app = express();
const port = 2404;
app.listen(port);
console.log('Own Login Test Listening in Port: ' + port);

const bcrypt = require('bcrypt');

// -------- Session Config
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoStore = new MongoDBStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'testDb2',
    collection: 'sessions',
});

app.use(
    session({
        secret: 'SecretWord',
        cookie: {maxAge:null},
        saveUninitialized: true,
        resave: false,
        store: mongoStore
    })
);

// -------- App Settings
app.set('view engine', 'ejs');
app.set('views', './Login_OwnTest/views');
app.use(express.urlencoded({extended:true})); // parse body

// -------- Routes
app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/register', (req,res)=>{
    res.render('register');
});
app.post('/register', (req,res)=>{
    res.end();
});

app.get('/login', (req,res)=>{
    res.render('login');
});
app.post('/login', (req,res)=>{
    res.end();
});

// -------- Database
const {database,testFun} = require('./database');
testFun();




