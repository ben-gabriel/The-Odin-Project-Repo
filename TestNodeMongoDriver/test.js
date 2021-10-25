// Tutorial mongoDB https://www.youtube.com/watch?v=fbYExfeFsI0&t=515s&ab_channel=MongoDB
//Create the client class
const {MongoClient} = require('mongodb');
// ↑ = const MongoClient = requite('mongodb').MongoClient;

async function main(){

    const uri = 'mongodb://localhost:27017';

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);

        //Crud Operations
        await createDocument(client, 'testDb1', 'collection1', {name:'Sarah'});

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
        console.log(`- ${db.name}`);
    });
}

async function createDocument(client, database, collection, newDocument){
    const result = await client.db(database).collection(collection).insertOne(newDocument);

    console.log(`New Document Created, _ID: ${result.insertedId}`);
}

main().catch(console.error);