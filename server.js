// server.js

// Basic Setup =============================================================
// =========================================================================
var express 	= require('express');

var app			= express(),
	bodyParser 	= require('body-parser'),
	morgan		= require('morgan'),
	mongoose	= require('mongoose');

var config 		= require('./app/config'); // leave comented when going live to hereoku

// App configuration =======================================================
// =========================================================================

app.use(bodyParser.urlencoded({extend: true})); // support encoded bodies
app.use(bodyParser.json()); // support json encode bodies

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
Authorization');
  next();
});

// log requests to the console ---------------------------------------------
app.use(morgan('dev'));

// port --------------------------------------------------------------------
//var port = process.env.PORT || 8080; // when conection in heroku
var port = config.port;

// conect to the database --------------------------------------------------
//var database = process.env.database;
var database = config.database;
mongoose.connect(database);

app.use( bodyParser.json() ); // support json encode bodies
app.use( bodyParser.urlencoded({extend: true}) ); // support encoded bodies

// Routes ==================================================================
// =========================================================================

// middleware that happens on every request ---- log requests
app.use(function(req, res, next){

	console.log('im the annoying middleware! in the future i will help \\o/');
	// continue what we are doing
	next();
});

// basic api route :) ------------------------------------------------------
app.get('/', function(req, res){
	res.send('Welcome to the Volunteers Center API :)');
});

// API ROUTES --------------------------------------------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE -----------------------------------------------------
// SENDS USERS TO THE FRONT END 
// hast to ve registered after OTHER ROUTES
app.get('*', function(req, res){
	res.sendFIle(path.join(__dirname + 'public/index.html'));
});

// Start the server ========================================================
// =========================================================================

app.listen(port);
console.log('Magic happens on port' + port);