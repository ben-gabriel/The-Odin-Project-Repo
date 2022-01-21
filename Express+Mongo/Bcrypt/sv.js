const express = require('express');
const app = express();
const port = 2404;
const bcrypt = require('bcrypt');

// -- Sv + Port
app.get('/', (req, res)=>{
    res.send('Hello Bcrypt!');
});
app.listen(port);
console.log('Bcrypt Server Listening in port: ', port);


// -- Database Emulator
const users = [
    // password field wouldn't be saved to db, only hashedPw would.
    {name: 'jhon', password: 'jhonpw', hashedPw: ''},
    {name: 'kyle', password: 'jhonpw', hashedPw: ''},
    {name: 'jess', password: 'jesspw', hashedPw: ''}
];
console.log('users = ', users); 


// -- Encrypting password
// Takes 1 user object and hashes its 'password' field.
async function encryptPassword(userObj){
    // generate salt, to mask real password. 
    let salt = await bcrypt.genSalt();

    // hash real password.
    let hashedPassword = await bcrypt.hash(userObj.password, salt);
    
    // save hashed password to database. 
    userObj.hashedPw = hashedPassword;
}


// -- Decrypting password
// Takes the password to compare against the password in database;
async function decryptPassword(passwordToCompare, userObj){
    // compare data and save result. 
    let comparisonResult = await bcrypt.compare(passwordToCompare, userObj.hashedPw);
    
    // admit or deny access to user. 
    if (comparisonResult === true){
        console.log(`Comparison SUCCESSFUL - ${passwordToCompare} is the correct password`);
    }
    else{
        console.log(`Comparison FAILED - ${passwordToCompare} is NOT the correct password`);
    }
}


// -- Simulate encryption process and log data.
(async function(){
    await encryptPassword(users[0]);
    await encryptPassword(users[1]);
    await encryptPassword(users[2]);
    console.log('users = ', users);
 
    console.log('\njess -> jesspw');
    await decryptPassword('jesspw', users[2]); // Using the correct password
    console.log('\njess -> secret');
    await decryptPassword('secret', users[2]); // Using an incorrect password
    
})()



















