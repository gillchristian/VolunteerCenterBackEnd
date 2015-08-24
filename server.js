// server.js

// =========================================================================
// ===== Basic Setup =======================================================
// =========================================================================

var express 	= require('express');
var app			= express(),
	bodyParser 	= require('body-parser'),
	mongoose	= require('mongoose');

app.use(bodyParser.json()); // support json encode bodies
app.use(bodyParser.urlencoded({extend: true})); // support encoded bodies

// port 

var port = process.env.PORT || 8080;

// conect to the database

var database = process.env.database;

mongoose.connect(database);

app.use( bodyParser.json() ); // support json encode bodies
app.use( bodyParser.urlencoded({extend: true}) ); // support encoded bodies

var User = require('./models/user.js');

// =========================================================================
// ===== Routes ============================================================
// =========================================================================

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

// applay the routes to our app
app.use('/', router);

// =========================================================================
// ===== Start the server ==================================================
// =========================================================================

app.listen(config.port);
console.log('Magic happens on port' + port);