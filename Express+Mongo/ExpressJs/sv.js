const express = require('express');
const app = express();
const port = 2404;

const path = require('path');
const wdir = './ExpressJs'; // working directory
const fs = require('fs');

const ejs = require('ejs');


const {MongoClient} = require('mongodb');

// -------- Middleware
app.use(express.urlencoded({extended:true})); // parse body

app.use((req, res, next)=>{
    console.log(req.originalUrl); // Logger
    next()   
});

// -------- Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// -------- Routes
app.get('/',(req, res)=>{    
    console.log('log in / ', database({},1).then((postData)=>{

            console.log('test in get / ', postData);
            res.render('index', {postData});

        })
        
    );

});

app.get('/style.css',(req, res)=>{    

    fs.readFile(wdir+'/style.css', function(error, content){
        res.set('Content-Type', 'text/css')
        res.send(content)
    });

});

app.post('/', (req, res)=>{    
    console.log(req.body);

    database(req.body).catch(console.error);

    res.redirect('/')

});


app.listen(port);
console.log(`Server Listening in Port ${port}`);


//Database
async function database(insert, flag=0){

    const uri = 'mongodb://localhost:27017';

    const client = new MongoClient(uri);

    const db = 'quotesBlog';
    const collection = 'posts';

    try {
        await client.connect();

        //Crud Operations
        if(flag==0){
            await createOneDocument(client, db, collection, insert);
        }
        else{
            const result = await findManyDocuments(client, db, collection);
            console.log('log inside database(): ', result)
            return result
        }

    }catch (e){
        console.error(e);
    }finally{
        await client.close();
    }

}

async function createOneDocument(client, database, collection, newDocument){
    newDocument._id = Date.now()
    let mydate = new Date();
    newDocument.postDate = `${mydate.getDay()}/${mydate.getMonth()}/${mydate.getFullYear()} - ${mydate.getHours()}:${mydate.getMinutes()}`;

    const result = await client.db(database).collection(collection).insertOne(newDocument);

    console.log(`New Document Created, _ID: ${result.insertedId}`);
}

async function findManyDocuments(client, database, collection, limit=100){
    const cursor = await client.db(database).collection(collection).find().limit(limit).sort({_id:-1});
    
    const result = await cursor.toArray();
    console.log('log inside findMany' , result);
    return result
}

