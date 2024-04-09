const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
  username: String,

});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
