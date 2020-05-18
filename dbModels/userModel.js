const mongoose = require('mongoose');

// add hooks to schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  points: Number,
  profilePic64: String,
  createdAt: String,
  token: String
})

//first arg = singular of collection name
  // ex: 'UserModel' looks for usermodels collection
const UserModel = mongoose.model('user', userSchema);
//const UserModel = mongoose.model('user', userSchema, 'users');
module.exports = UserModel;