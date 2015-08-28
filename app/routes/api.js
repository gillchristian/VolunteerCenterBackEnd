var User 	= require('./../models/user');
var Place 	= require('./../models/place');

module.exports = function(app, express){

	// get an instance of the Express Router ------------------------------
	var router = express.Router();


// User ===================================================================
// ========================================================================

// localhost:8080/users --- ROUTES ----------------------------------------
	router.route('/users')

		// get all the users ----------------------------------------------
		.get(function(req, res){
			
			// find all \o/ the users
			User.find({}, function(err, users){
				if (err) throw err;
				
				console.log(users.length + '-> users retrived');
				res.json(users);
			});
		})

		// add a single user ----------------------------------------------
		.post(function(req, res){
			var user 	= new User();

			user.name 		= req.body.name,
			user.lastname 	= req.body.lastname,
			user.email 		= req.body.email,
			user.phone 		= req.body.phone,

			user.save(function(err){
				if(err) throw err;

				res.send('User Created!!!');
				console.log('User saved!');
			});

		});

	// Localhost:8080/users/:user_id --- ROUTES ---------------------------
	router.route('/users/:_id')
		
		// get an user by its id ------------------------------------------
		.get(function(req, res){

			User.findById(req.params._id, function(err, user){
				if (err) throw err;

				console.log(user);
				res.json(user);
			});
		})

		// update an user -------------------------------------------------
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
				});
			});
		})

		// remove a user --------------------------------------------------
		.delete(function(req, res){

			User.remove({_id: req.params._id }, function(err, user){
				if (err) throw err;
				
				res.send('Successfully deleted');
				console.log('Successfully deleted');
			});
		});

// Place ==================================================================
// ========================================================================

// localhost:8080/places --- ROUTES ---------------------------------------
	router.route('/places')

		// get all the places ---------------------------------------------
		.get(function(req, res){

			Place.find({}, function(err, places){
				if (err) throw err;
				
				console.log(places.length + '-> places retrived');
				res.json(places);
			});		
			})

		// add a single place ---------------------------------------------
		.post(function(req, res){

			var place 	= new Place();

			place.name 			= req.body.name,
			place.addres 		= req.body.addres,
			place.coordinator 	= req.body.coordinator,
			place.phone 		= req.body.phone,

			place.save(function(err){
				if(err) throw err;

				res.send('Place Created!!!');
				console.log('Place saved!');
			});

		});

	// localhost:8080/places/:place_id --- ROUTES -------------------------
	router.route('/places/:_id')
		
		// get an place by its id -----------------------------------------
		.get(function(req, res){

			Place.findById(req.params._id, function(err, place){
				if (err) throw err;

				console.log(place);
				res.json(place);
			});
		})

		// update an place ------------------------------------------------
		.put(function(req, res){

			Place.findById(req.params._id, function(err, place){
				if (err) throw err;

				if (req.body.name) 			place.name = req.body.name;
				if (req.body.addres) 		place.addres = req.body.addres;
				if (req.body.phone) 		place.phone = req.body.phone;
				if (req.body.coordinator) 	place.coordinator = req.body.coordinator;

				place.save(function(err){
					if (err) throw err;

					res.send('Place Updated!!!');
					console.log('Place Updated!!!');
				});
			});
		})

		// remove a place -------------------------------------------------
		.delete(function(req, res){

			Place.remove({_id: req.params._id }, function(err, place){
				if (err) throw err;
				
				res.send('Place Successfully deleted');
				console.log('Place Successfully deleted');
			});
		});
	return router;
};
