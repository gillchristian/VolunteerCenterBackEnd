// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var placeSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  coordinator: String
});

// the schema is useless so far
// we need to create a model
var Place = mongoose.model('Place', placeSchema);

// make this available to our users in our Node applications
module.exports = Place;