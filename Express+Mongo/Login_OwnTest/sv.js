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
        cookie: {maxAge:1000},
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
{// GET
    app.get('/', (req,res)=>{
        res.render('index');
    });

    app.get('/login', (req,res)=>{
        res.render('login');
    });

    app.get('/register', (req,res)=>{
        res.render('register');
    });
}

{// POST
    app.post('/login', (req,res)=>{
        
        let idLookUp = database.findUser({_id: req.body.username});

        idLookUp.then((lookUpResult)=>{

            if(lookUpResult){
                console.log('{POST /login} Found User With ID ' + result._id);
                
                let passwordCompare = bcrypt.compare(req.body.password, result.password);

                passwordCompare.then((compareResult)=>{

                    if(compareResult){
                        console.log('{POST /login} Access Granted');
                    }
                    else{
                        console.log('{POST /login} Access Denied - Wrong Password');
                    }
                    
                });

            }
            else{
                console.log('{POST /login} User Not Found');
            }
            
        });

        res.redirect('/login');
    });

    app.post('/register', (req,res)=>{
        
        async function encryptPassword(rawPassword){
            
            try {
                // generate salt, to mask real password. 
                let salt = await bcrypt.genSalt();
            
                // hash real password.
                let hashedPassword = await bcrypt.hash(rawPassword, salt);
                
                return hashedPassword;
            } 
            catch(e) {
                console.log('Error in encryptPassword');
            }
            
        }

        let hashPassword = encryptPassword(req.body.password);

        hashPassword.then(
            (encryptedPassword)=>{
                let newUserObj = {
                    _id: req.body.username,
                    password: encryptedPassword
                };
                database.createUser(newUserObj);
            }
        );

        res.redirect('/login');
    });
}

// -------- Database
const {database,testFun} = require('./database');
testFun();




