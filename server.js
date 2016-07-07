const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://albi:1@ds015995.mlab.com:15995/nodecrud', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended:true}));

// Geting url's

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', function (req, res) {
	db.collection('quotes').save(req.body, function (err, result) {
		if (err) {
			return console.log(err);
		}

		console.log("Saved to database")
		res.redirect('/');
	});
});
