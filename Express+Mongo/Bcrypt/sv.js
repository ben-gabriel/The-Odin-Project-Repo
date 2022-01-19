const express = require('express');
const app = express();
const port = 2404;

app.get('/', (req, res)=>{
    res.send('Hello Bcrypt');
});

// -------- Post
app.post('/createUser', (req, res)=>{
    
});
app.post('/Login', (req, res)=>{

});

app.listen(port);
console.log('Bcrypt Server Listening in port: ',port);

// -------- DataBase
const {MongoClient} = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const db = 'quotesBlog';
const collection = 'users';

