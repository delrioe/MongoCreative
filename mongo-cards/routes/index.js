var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { root: 'public' });
});

/*
for my reference
curl -X "POST" --data '{"Name":"Mickey","Comment":"Hello"}' -H "Content-Type: application/json" http://localhost:4200/comment
curl -X "GET" http://localhost:3005/comment
curl -X "DELETE" http://localhost:3005/comment
show dbs
use somthing
show collections
db.getCollection("comments").find()
*/

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/cardDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var cardSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    URL: String,
    Description: String,
    Element: String,
    Attack: String,
    Defense: String,
    Color: String
});

var Card = mongoose.model('Card', cardSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

/* GET cards from database */
router.get('/card', function(req, res, next) {
    console.log("In the GET route?");
    console.log(req.query);
    var name = req.query["q"];
    console.log("Name: " + name);
    var obj={};
    if (name) {
        obj = {Name:name};
    }
    Card.find(obj, function(err, commentList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(commentList); //Otherwise console log the comments you found
            res.json(commentList); //Then send the comments
        }
    })
});

router.delete('/card', function(req, res, next) {
    console.log("In Delete");
    Card.collection.remove();
});

/* POST a card into the database */
router.post('/card', function(req, res, next) {
    console.log("POST card route");
    console.log(req.body);
    var newCard = new Card(req.body);
    console.log(newCard);
    newCard.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

module.exports = router;
