// server.js

// =========================================================================
// ===== Basic Setup =======================================================
// =========================================================================

var express 	= require('express');
var app			= express(),
	bodyParser 	= require('body-parser'),
	port 		= process.env.PORT || 8080;

app.use(bodyParser.json()); // support json encode bodies
app.use(bodyParser.urlencoded({extend: true})); // support encoded bodies

// =========================================================================
// ===== Routes ============================================================
// =========================================================================

app.route('/login')
	
	// show the form (GET hhtp://localhost:8080/login)
	.get(function(req, res) {
		res.send('this is the login form!');
	})

	// process the form (POST htto://localhost:8080/login)
	.post(function(req, res){
		console.log('processing the form');
		res.send('processing the login form!');
	});


// sample route
app.get('/sample', function(req, res) {

	res.send('this is a sample!');
});

// Specific Routing for Specific Parameters --- (GET)
app.get('/sample/check/:version', function(req, res) {

	res.send('version: ' + req.params.version);
});

// Getting Any URL Parameter
app.get('/sample/user', function(req, res) {
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  

  res.send(user_id + ' ' + token + ' ' + geo);
});

// POST Parameters

app.post('/sample/users', function(req, res){
	var user_id = req.body.id;
	var token = req.body.token;
	var geo = req.body.geo;

	res.send(user_id + ' ' + token + ' ' + geo);
})

// routes here ------------------ 

// instance of router
var router = express.Router();

// middleware that happens on every request
router.use(function(req, res, next){

	// log each request
	console.log(req.method, req.url);

	// continue
	next();
});

// home page route (http://localhost:8080)
router.get ('/', function(req, res){
	res.send('this is the home page :)');
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res){

	res.send('about page :) ');
});

// route middleware to validate :name
router.param('name', function(req, res, next, name){

	// here goes the validation :)
	console.log(name + ' working hard on that validation ;)');

	// after validation save the new item
	req.name = name + ' capologies';

	// continue
	next();
});

// route with parameters (http://localhost:8080/hello/:name)
router.get('/hello/:name', function(req, res) {
	res.send('hello ' + req.name + '!');
});

// applay the routes to our app
app.use('/', router);

// =========================================================================
// ===== Start the server ==================================================
// =========================================================================

app.listen(port);
console.log('Magic happens on port' + port);