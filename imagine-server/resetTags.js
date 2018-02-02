const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'imagine-server';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const col = db.collection('tags');
    col.insert([{a:1, b:1}
        , {a:2, b:2}, {a:3, b:3}
        , {a:4, b:4}], {w:1}, function(err, result) {
        console.log(err, result);
    });

    client.close();
});