const { MongoClient } = require("mongodb");

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const db = 'testDb2';
const collection = 'users';

const database = {

    createUser: async function(newUserObj){
        try {
            await client.connect();

            const result = await client.db(db).collection(collection).insertOne(newUserObj);
        
            console.log(`{users} New Document Created, _ID: ${result.insertedId}`);

            return result.insertedId;

        }catch (e){
            console.error(e);
        }finally{
            await client.close();
        }    
    },

    findUser: async function(queryObj={}){
        try {
            await client.connect();
            const result = await client.db(db).collection(collection).findOne(queryObj);
        
            console.log(`{users} Document Found: ${result}`);
            return result;
            
        }catch (e){
            console.error(e);
        }finally{
            await client.close();
        }
      },
}


function testFun(){
    console.log('log inside testFun() -> ExpressJs/database.js');
}

module.exports = {database, testFun};