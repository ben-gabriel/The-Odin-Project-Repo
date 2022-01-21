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

async function createPassword(userObj){
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(userObj.password, salt);
    userObj.hashedPw = hashedPassword;
}

(async function(){
    await createPassword(users[0])
    await createPassword(users[1])
    await createPassword(users[2])
    console.log('users = ', users);
})()



app.listen(port);
console.log('Bcrypt Server Listening in port: ', port);




















