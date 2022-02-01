const express = requite('express');
const app = express();
const port = 2404;

const bcrypt = require('bcrypt');

const MongoDBStore = require('connect-mongodb-session')(session);
const mongoStore = new MongoDBStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'testDb2',
    collection: 'sessions',
});

const session = require('express-session');
app.use(
    session({
        secret: 'SecretWord',
        cookie: {maxAge:null},
        saveUninitialized: true,
        resave: false,
        store: mongoStore
    })
);

