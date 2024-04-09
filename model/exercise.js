
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now }
  });
  
  const Exercise = mongoose.model('Exercise', exerciseSchema);
  
  module.exports=Exercise;