const { MongoClient } = require("mongodb");

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const db = 'quotesBlog';
const collection = 'posts';

let database = {

    createOneDocument: async function(newDocument){ 
        console.log("console.log inside createone ", newDocument);      
        try {
            await client.connect();
    
            //To Do: Fix date (Make universal-time based rather than sv based);
            newDocument._id = Date.now()
            let mydate = new Date();
            newDocument.postDate = `${mydate.getUTCDate()}/${mydate.getUTCMonth()}/${mydate.getFullYear()} - ${mydate.getHours()}:${mydate.getMinutes()}`;
        
            const result = await client.db(db).collection(collection).insertOne(newDocument);
        
            // console.log(`New Document Created, _ID: ${result.insertedId}`);
            console.log("console.log inside createone ", result.insertedId);

            return result.insertedId;

        }catch (e){
            console.error(e);
        }finally{
            await client.close();
        }   
    },

    findOneDocument: async function(queryObj={}){
      try {
            await client.connect();
            const result = await client.db(db).collection(collection).findOne(queryObj);
        
            console.log('log inside findOne' , result);
            return result;
            
        }catch (e){
            console.error(e);
        }finally{
            await client.close();
        }
    },

    findManyDocuments: async function(pageNumber=0, limit=2){

        try {
            await client.connect();
            const cursor = await client.db(db).collection(collection).find().limit(limit).sort({_id:-1}).skip(pageNumber);
        
            const result = await cursor.toArray();
            console.log('log inside findMany()' , result);
            return result;
            
        }catch (e){
            console.error(e);
        }finally{
            await client.close();
        }
    },

    deleteOneDocument: async function(queryObj = {}){
        try {
            await client.connect();
            const result = await client.db(db).collection(collection).deleteOne(queryObj);

            console.log(`${result.deletedCount} Document/s deleted`);
            
        }catch (e){
            console.error(e);
        }finally{
            await client.close();
        }
    },

}


function testFun(){
    console.log('log inside testFun');
}

module.exports = {database,testFun};