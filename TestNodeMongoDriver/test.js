// Tutorial mongoDB https://www.youtube.com/watch?v=fbYExfeFsI0&t=515s&ab_channel=MongoDB
//Create the client class
const {MongoClient} = require('mongodb');
// ↑ = const MongoClient = require('mongodb').MongoClient;

async function main(){

    const uri = 'mongodb://localhost:27017';

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);

        //Crud Operations
        await createOneDocument(client, 'testDb1', 'collection1', {name:'Rachel'});

        //await findOneDocument(client,'testDb1', 'collection1','Rachel');
        await findManyDocuments(client, 'testDb1', 'collection1', 10);

        await updateOneDocument(client,'testDb1', 'collection1', {name:'Rachel'},{age:35});

        await findOneDocument(client,'testDb1', 'collection1','Rachel');

        await deleteOneDocument(client,'testDb1', 'collection1', {name:'Rachel'})


    }catch (e){
        console.error(e);
    }finally{
        await client.close();
    }

}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    
    console.log('Databases: ');
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name} `);
    });
}

async function createOneDocument(client, database, collection, newDocument){
    const result = await client.db(database).collection(collection).insertOne(newDocument);

    console.log(`New Document Created, _ID: ${result.insertedId}`);
}

async function findOneDocument(client, database, collection, parameter={}){
    const result = await client.db(database).collection(collection).findOne({name:parameter});

    if(result){
        console.log(`: `);
        console.log(result);
    }
    else{
        console.log(`Document with parameter name ${parameter} not found`);
    }
}

async function findManyDocuments(client, database, collection, limit){
    const cursor = await client.db(database).collection(collection).find().limit(limit).sort({name:1});
    
    const result = await cursor.toArray();
    console.log(result);

}

async function updateOneDocument(client, database, collection, queryObj, updateObj){
    const result = await client.db(database).collection(collection).updateOne(queryObj, {$set: updateObj});

    console.log(`\n${result.matchedCount} Matched document/s, ${result.modifiedCount} Modified.`);
}

async function deleteOneDocument(client, database, collection, queryObj = {}){
    const result = await client.db(database).collection(collection).deleteOne(queryObj);

    console.log(`${result.deletedCount} Document/s deleted`);

}

main().catch(console.error);