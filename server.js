// server.js

// =========================================================================
// ===== Basic Setup =======================================================
// =========================================================================

var express 	= require('express');
var app			= express(),
	bodyParser 	= require('body-parser'),
	mongoose	= require('mongoose'),
	config		= requiere('./config');


// conect to the database
mongoose.connect(config.database);

app.use(bodyParser.json()); // support json encode bodies
app.use(bodyParser.urlencoded({extend: true})); // support encoded bodies

var User = require('./models/user.js');

// =========================================================================
// ===== mongoDB ===========================================================
// =========================================================================

var chris = new User ({
	name: 'Chris',
	mail: 'chrisdude@gmail.com',
	lastname: 'Dude',
	phone: '1234567890'
});

chris.save(function(err){
	if(err) throw err;

	console.log('User saved!');
});

// get all the users
User.find({}, function(err, users){
	if (err) throw err;

	console.log(users);
});

// get the user chris
User.find({name: 'chris'}, function(err, user){
	if (err) throw err;

	console.log(user);
});

// find by ID: id of 1
/*
User.findById(1, function(err, user){
	if (err) throw err;

	console.log(user);
});

// get any admin that was created in the past month

// get the date 1 month ago
var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);

User.find({ admin: true }).where('created_at').gt(monthAgo).exec(function(err, users) {
  if (err) throw err;

  // show the admins in the past month
  console.log(users);
});

// get user with ID 1 then update
User.findById(1, function(err, user){
	if (err) throw err;

	user.email += '.ar';

	user.save(function(err){
		if (err) throw err;

			console.log('User update!!');
	});
});

// finde by ID and update
User.findByIdAndUpdate(1, {username: 'rand user'}, function(err, user){
	if (err) throw err;

	console.log(user);
});
*/

// find and update

User.findOneAndUpdate({name: 'chris'}, {name: 'chris the dude'}, function(err, ser){
	if (err) throw err;

	console.log(user);
});


// get usern then remove
User.find({name: 'chris'}, function(err, user){
	if (err) throw err;

	user.remove(function(err){
		if (err) throw err;

		console.log('User removed :/');
	});
});

// finde and remove
User.findOneAndRemove({name: 'chris'}, function(err){
	if (err) throw err;

	console.log('User removed :/');
});

/*
// find by ID and remove
User.findByIdAndRemove(4, function(err){
	if (err) throw err;

	console.log('User removed :/');
});
*/

var ro = new User ({
	name: 'Ro',
	mail: 'rothelady@gmail.com',
	lastname: 'Lady',
	phone: '1234567890'
});

ro.save(function(err){
	if(err) throw err;

	console.log('User saved!');
});
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

app.listen(config.port);
console.log('Magic happens on port' + config.port);