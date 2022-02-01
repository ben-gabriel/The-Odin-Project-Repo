const { MongoClient } = require("mongodb");

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const db = 'testDb2';
const collection = 'users';

const database = {

}


function testFun(){
    console.log('log inside testFun() -> ExpressJs/database.js');
}

module.exports = {database, testFun};