// Initialize express app
const express = require('express');
const app = express();

app.use(express.json()); // Body parsing middleware

// Database
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/reachDB";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("we're connected!")
});

// Allow front end to access API
const cors = require('cors');
app.use(cors())


// --------- ROUTES ---------

// create new user
app.use(require('./API/signup_routes.js'));

// validate username, pwd and send token
app.use(require('./API/login_routes.js'));

// Validate token / canEdit profile
app.use(require('./API/auth_routes.js'));

// Send user profile information
app.use(require('./API/profile_routes.js'));

// User edit self
app.use(require('./API/edit_user_routes.js'));


// Listen
const port = 1338;
const hostname = "localhost";
app.listen(port, () => console.log(`Beta Reach BackEnd Server listening at http://${hostname}:${port}`))