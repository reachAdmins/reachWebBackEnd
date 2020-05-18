const express = require('express');
const UserModel = require('../dbModels/userModel');
const jwt = require('jsonwebtoken')
router = express.Router();

fetchUsername = async (username) => {
  try {
    doc = await UserModel.findOne( {username: username} ).exec();
  } catch(err) {
    console.error(err);
  }
}

fetchEmail = async (email) => {
  try {
    return doc = await UserModel.findOne( {email: email} ).exec();
  } catch(err) {
    console.error(err);
  }
}

router.post("/signup", async (req,res) => {

  console.log("Registration attempt: ")

  // initialize resBody
  const resBody = {
    cont: false,
    errorMessage: '',
    jwt: '',
  }

  const date = new Date()
  const createdAt = `${date.getMonth()}.${date.getDate()}.${date.getFullYear()}`

  // Extract data from register request
  const insertUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    points: 0,
    profilePic64: '',
    createdAt: createdAt,
    token: ''
  }

  const usernameDoc = await fetchUsername(insertUser.username)
  const emailDoc = await fetchEmail(insertUser.email)

  if(usernameDoc !== null) {
    resBody.errorMessage = 'This username already exists'
    res.send(resBody)
  } else {
    if(emailDoc !== null) {
      resBody.errorMessage = 'Email already associated with existing account'
      res.send(resBody)
    } else {

      insertUser.token = jwt.sign(insertUser.username,'abcd')

      const newUser = new UserModel(insertUser);
      newUser.save(function (err, newUser) {

        if (err) return console.error(err);

        // create JWT
        resBody.cont = true
        resBody.jwt = insertUser.token
        res.send(resBody)
      })
    }
  }
});

module.exports = router;

// instance of a model is a document
// findOne returns a query object