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

    findManyDocuments: async function(limit=100){

        try {
            await client.connect();
            const cursor = await client.db(db).collection(collection).find().limit(limit).sort({_id:-1});
        
            const result = await cursor.toArray();
            // console.log('log inside findMany' , result);
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

    }

}



function testFun(){
    console.log('log inside testFun');
}

module.exports = {database,testFun};

//--------------------------------------------------------
// async function database(insert, flag=0){

//     const uri = 'mongodb://localhost:27017';

//     const client = new MongoClient(uri);

//     const db = 'quotesBlog';
//     const collection = 'posts';

//     try {
//         await client.connect();

//         //Crud Operations
//         if(flag==0){
//             //Returns post ID
//             return await createOneDocument(client, db, collection, insert);
//         }
//         else if(flag == (-1)){
//             await deleteOneDocument(client,db,collection, insert);
//         }
//         else if(flag == 1){
//             let result = await findOneDocument(client, db, collection, insert);
//             // console.log('log inside database(): ', result)
//             return result
//         }
//         else{
//             let result = await findManyDocuments(client, db, collection);
//             // console.log('log inside database(): ', result)
//             return result
//         }
        
//     }catch (e){
//         console.error(e);
//     }finally{
//         await client.close();
//     }

// }

// async function createOneDocument(client, database, collection, newDocument){
    
//     console.log("console.log inside createone ", newDocument)
    
    
//     newDocument._id = Date.now()
//     let mydate = new Date();
//     newDocument.postDate = `${mydate.getUTCDate()}/${mydate.getUTCMonth()}/${mydate.getFullYear()} - ${mydate.getHours()}:${mydate.getMinutes()}`;

//     const result = await client.db(database).collection(collection).insertOne(newDocument);

//     // console.log(`New Document Created, _ID: ${result.insertedId}`);
//     console.log("console.log inside createone ", result.insertedId)
//     return result.insertedId;
// }

// async function findOneDocument(client, database, collection, insert={}){
//     const result = await client.db(database).collection(collection).findOne(insert);
    
//     console.log('log inside findMOne' , result);
//     return result
// }

// async function findManyDocuments(client, database, collection, limit=100){
//     const cursor = await client.db(database).collection(collection).find().limit(limit).sort({_id:-1});
    
//     const result = await cursor.toArray();
//     // console.log('log inside findMany' , result);
//     return result
// }

// async function deleteOneDocument(client, database, collection, queryObj = {}){
//     const result = await client.db(database).collection(collection).deleteOne(queryObj);

//     console.log(`${result.deletedCount} Document/s deleted`);

// }

// function testFun(){
//     console.log('log inside testFun');
// }

// module.exports = {database,testFun};