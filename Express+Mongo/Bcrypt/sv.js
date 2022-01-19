const express = require('express');
const app = express();
const port = 2404;
const bcrypt = require('bcrypt');

app.get('/', (req, res)=>{
    res.send('Hello Bcrypt');
});

const users = [
    {name: 'jhon', password: 'jhonpw', hashedPw: ''},
    {name: 'kyle', password: 'jhonpw', hashedPw: ''},
    {name: 'jess', password: 'jesspw', hashedPw: ''}
];

console.log('users = ', users);

const saltPromise = bcrypt.genSalt();
saltPromise.then((salt)=>{
    console.log(salt);
    let hashedPwPromise = bcrypt.hash(users[0].password, salt);
    hashedPwPromise.then((hashPw)=>{
        console.log(hashPw)
    });
});


app.listen(port);
console.log('Bcrypt Server Listening in port: ',port);

