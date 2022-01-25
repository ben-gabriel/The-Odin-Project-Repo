const express = require('express');
const app = express();
const port = 2404;

app.listen(port);
console.log('Express-Session Listening in port ', port);

{/* Own Cookies test with cookie-parser. 
    const cookieParser = require('cookie-parser');
    app.use(cookieParser('secretWord'));
    
    app.get('/', (req, res)=>{
        
        let cookie = req.cookies.myCookie; 
        res.cookie('signedCookie', 'signedValue', {signed: true});

        if(!cookie){
            // There is no cookie, set cookie.
            res.cookie('myCookie',0, {maxAge:999999, httpOnly:true});
        }
            else{
            // There is a cookie, increase its value.
            cookie = Number(cookie)+1;
            res.cookie('myCookie', cookie, {maxAge:999999, httpOnly:true});
            
            console.log('req.cookies = ', req.cookies);
            console.log('req.signedCookies = ', req.signedCookies);
            
        }
        
        res.end();
        
    });
*/}


{/* Express-session module test.*/
    const session = require('express-session');

    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

    // Access the session as req.session
    app.get('/', function(req, res, next) {
        
        if (req.session.views) {
            req.session.views++
            req.session.myValue++
            res.setHeader('Content-Type', 'text/html')
            res.write('<p>views: ' + req.session.views + '</p>')
            res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
            res.end()
        } else {
            req.session.views = 1
            req.session.myValue = 2
            res.end('welcome to the session demo. refresh!')
        }

        console.log('\n\n', req.session);
        console.log('\n-- req.session.cookie: ', req.session.cookie);
        console.log('\n-- req.session.id: ', req.session.id);

        //   let mycookie = req.session.cookie;
        //   if(mycookie){
        //   }

    });
}

