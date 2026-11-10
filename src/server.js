var express = require('express');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../assets/index.html"));
});

app.get('/profile-picture', function (req, res) {
    var img = fs.readFileSync(path.join(__dirname, '../assets/profile-picture.jpeg'));
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');
});

app.get('/get-profile', async function (req, res) {
    try {
        const client = await MongoClient.connect('mongodb://mongodb:27017');
        const db = client.db('my_db');
        const query = { userid: 1 };
        
        const result = await db.collection('users').findOne(query);
        await client.close();
        res.send(result ? result : {});
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
});

app.post('/update-profile', async function (req, res) {
    var userObj = req.body;
    console.log('connecting to the db...');

    try {
        const client = await MongoClient.connect('mongodb://mongodb:27017');
        console.log('successfully connected to the user-account db');

        const db = client.db('my_db');
        userObj['userid'] = 1;
        const query = { userid: 1 };
        const newValues = { $set: userObj };

        // Modern async update
        await db.collection('users').updateOne(query, newValues, {upsert: true});
        console.log('successfully updated or inserted');
        
        await client.close();
        res.send(userObj);
    } catch (err) {
        console.error("Connection failed:", err);
        res.status(500).send("Failed to connect to database");
    }
});

app.listen(3000, function () {
    console.log("app listening on port 3000!");
});