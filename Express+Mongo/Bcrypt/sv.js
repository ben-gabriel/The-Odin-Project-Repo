const express = require('express');
const app = express();
const port = 2404;
const bcrypt = require('bcrypt');

app.get('/', (req, res)=>{
    res.send('Hello Bcrypt!');
});

// --------- Database Emulator
const users = [
    // password field wouldn't be saved to db, only hashedPw would.
    {name: 'jhon', password: 'jhonpw', hashedPw: ''},
    {name: 'kyle', password: 'jhonpw', hashedPw: ''},
    {name: 'jess', password: 'jesspw', hashedPw: ''}
];
console.log('users = ', users); 

// -------- Encrypting password
// Takes 1 user object and hashes its 'password' field.
async function encryptPassword(userObj){
    // generate salt, to mask real password. 
    let salt = await bcrypt.genSalt();

    // hash real password.
    let hashedPassword = await bcrypt.hash(userObj.password, salt);
    
    // save hashed password to database. 
    userObj.hashedPw = hashedPassword;
}

// Simulate encryption process and log data.
(async function(){
    await encryptPassword(users[1])
    await encryptPassword(users[0])
    await encryptPassword(users[2])
    console.log('users = ', users);
})()

// --------- Sv Port
app.listen(port);
console.log('Bcrypt Server Listening in port: ', port);




















