// Initialize express app
const express = require('express');
const app = express();

app.use(express.json()); // Body parsing middleware
// app.use(express.json({limit: '300mb'})); // Body parsing middleware

// Database
const mongoose = require('mongoose');
const dbURL = "mmongodb+srv://stavrones:Stavpizza!23@cluster0-jiwwd.mongodb.net/Reach?retryWrites=true&w=majority";
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log("DB Connection successfull") });

// Allow front end to access API
const cors = require('cors');
app.use(cors())


// --------- ROUTES ---------

// SIGNUP
// Create new user doc => { token: String }
app.use(require('./API/signup.js'));

// LOGIN
// validate (username, pwd) => { token: String }
app.use(require('./API/login.js'));

// AUTHORIZE TOKEN
// validate token => { Auth: Bool } 
app.use(require('./API/auth.js'));

// SEND USER PROFILE
// get user and userPost doc => { userData: {data}, userPosts: { {postID: Data},{postID: Data}... } }
app.use(require('./API/userProfile.js'));

// SEND PRIVATE USER DATA
// Get private user data for settings page
app.use(require('./API/userPrivateData.js'));

// EDIT USER DATA
// Submit request to change user data
app.use(require('./API/editUser.js'));

// CREATE USER POST
// Add new post to user_posts collection to user_doc array
app.use(require('./API/createUserPost.js'));

// DELETE USER POST
// Delete post from user_posts collection from user_doc array
app.use(require('./API/deleteUserPost.js'));


// Listen
const port = 1338;
const hostname = "localhost";
app.listen(port, () => console.log(`Beta Reach BackEnd Server listening at http://${hostname}:${port}`))