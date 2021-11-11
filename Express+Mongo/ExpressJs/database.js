const { MongoClient } = require("mongodb");

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
            return 99999
        }
        else if(flag == (-1)){
            await deleteOneDocument(client,db,collection, insert);
        }
        else{
            const result = await findManyDocuments(client, db, collection);
            // console.log('log inside database(): ', result)
            return result
        }

    }catch (e){
        console.error(e);
    }finally{
        await client.close();
    }

}

async function createOneDocument(client, database, collection, newDocument){
    
    console.log("console.log inside createone ", newDocument)
    
    
    newDocument._id = Date.now()
    let mydate = new Date();
    newDocument.postDate = `${mydate.getUTCDate()}/${mydate.getUTCMonth()}/${mydate.getFullYear()} - ${mydate.getHours()}:${mydate.getMinutes()}`;

    const result = await client.db(database).collection(collection).insertOne(newDocument);

    // console.log(`New Document Created, _ID: ${result.insertedId}`);
    console.log("console.log inside createone ", result.insertedId)
    return result.insertedId;
}

async function findManyDocuments(client, database, collection, limit=100){
    const cursor = await client.db(database).collection(collection).find().limit(limit).sort({_id:-1});
    
    const result = await cursor.toArray();
    // console.log('log inside findMany' , result);
    return 99999
}

async function deleteOneDocument(client, database, collection, queryObj = {}){
    const result = await client.db(database).collection(collection).deleteOne(queryObj);

    console.log(`${result.deletedCount} Document/s deleted`);

}

function testFun(){
    console.log('log inside testFun');
}

module.exports = database;