const express = require('express');
const app = express();
const port = 2404;

app.listen(port);
console.log('Express-Session Listening in port ', port);

// -------- Own Cookies test
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res)=>{
    
    let cookie = req.cookies.myCookie; 
    
    if(cookie){
        // there is a cookie
        cookie = Number(cookie)+1;
        res.cookie('myCookie',cookie, {maxAge:999999, httpOnly:true});
        console.log('cookie = ', cookie);
        console.log(Number(cookie))
    }
    else{
        // set cookie
        res.cookie('myCookie',0, {maxAge:999999, httpOnly:true});
    }
    
    res.end();

});