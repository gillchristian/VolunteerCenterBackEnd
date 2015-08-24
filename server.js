// server.js

// =========================================================================
// ===== Basic Setup =======================================================
// =========================================================================

var express 	= require('express');
var app			= express(),
	bodyParser 	= require('body-parser'),
<<<<<<< HEAD
	port 		= process.env.PORT || 8080;

app.use(bodyParser.json()); // support json encode bodies
app.use(bodyParser.urlencoded({extend: true})); // support encoded bodies
=======
	mongoose	= require('mongoose'),
	config		= require('./config.js');


// conect to the database
mongoose.connect(config.database);

app.use( bodyParser.json() ); // support json encode bodies
app.use( bodyParser.urlencoded({extend: true}) ); // support encoded bodies

var User = require('./models/user.js');
>>>>>>> development

// =========================================================================
// ===== Routes ============================================================
// =========================================================================

<<<<<<< HEAD
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
=======
// get an instance of the Express Router

var router = express.Router();

// middleware that happens on every request ---- log requests
router.use(function(req, res, next){

	console.log(req.method, req.url);
	console.log('------------------------');
	// continue what we are doing
	next();
});

// basic api route :)

router.get('/', function(req, res){
	res.send('Welcome to the Volunteers Center API :)');
});


// routes --- localhost:8080/users
router.route('/users')

	.get(function(req, res){
		
		// find all \o/ the users
		User.find({}, function(err, users){
			
			if (err) throw err;
			console.log(users);
			console.log('------------------------');
			// send the users 
			res.json(users);
		});
	})

	.post(function(req, res){

		var user 	= new User();

		user.name 		= req.body.name,
		user.lastname 	= req.body.lastname,
		user.email 		= req.body.email,
		user.phone 		= req.body.phone,

		user.save(function(err){
			if(err) throw err;

			console.log('User saved!');
			console.log('------------------------');
		});

	});

// routes --- localhost:8080/users/:user_id
router.route('/users/:_id')
	
	.get(function(req, res){

		User.findById(req.params._id, function(err, user){
			if (err) throw err;

			console.log(user);
			console.log('------------------------');
			res.json(user);
		});
	})

	.put(function(req, res){

		User.findById(req.params._id, function(err, user){
			
			if (err) throw err;

			if (req.body.name) 		user.name = req.body.name;
			if (req.body.lastname) 	user.lastname = req.body.lastname;
			if (req.body.phone) 	user.phone = req.body.phone;
			if (req.body.email) 	user.email = req.body.email;

			user.save(function(err){
				if (err) throw err;

				res.send('User Updated!!!');
				console.log('User Updated!!!');
				console.log('------------------------');
			});
		});
	})

	.delete(function(req, res){

		console.log(req.method);

		User.remove({_id: req.params._id }, function(err, user){
			if (err) throw err;
			res.send('Successfully deleted');
			console.log('Successfully deleted');
			console.log('------------------------');
		});
	});
>>>>>>> development

// applay the routes to our app
app.use('/', router);

// =========================================================================
// ===== Start the server ==================================================
// =========================================================================

<<<<<<< HEAD
app.listen(port);
console.log('Magic happens on port' + port);
=======
app.listen(config.port);
console.log('Magic happens on port' + config.port);
>>>>>>> development
