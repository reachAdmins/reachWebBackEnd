const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../dbModels/userModel')
router = express.Router()

// 1. Get username_email and password from front end
// 2. Check if username or email are valid users
// 3. Check if password matches
// 4. Send JWT to front end

fetchUsername = async (username) => {
  try {
    return doc = await UserModel.findOne( {username: username} ).exec();
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

router.post("/login", async (req,res) => {

  // default response
  const resBody = {
    cont: false,
    errorMessage: "",
    token: undefined
  };

  // extract login information from post req
  const user = {
    username: req.body.username_email,
    email: req.body.username_email,
    password: req.body.password
  }

  const usernameDoc = await UserModel.findOne( {username: user.username} ).exec()

  if( usernameDoc === null) {

    resBody.errorMessage = "No user with this username"
    res.send(resBody)

  } else {
    if (user.password === usernameDoc.password) {

      res.send({cont: true, token: usernameDoc.token, username: usernameDoc.username})

    } else {
      resBody.errorMessage = "Incorrect password"
      res.send(resBody)
    }
  }

  const emailDoc = await UserModel.findOne( {email: user.email} ).exec()

  if (emailDoc === null) {

    resBody.errorMessage = "No user with this email"
    res.send(resBody)

  } else {
    if (user.password === emailDoc.password) {

      res.send({cont: true, token: emailDoc.token, username: emailDoc.username})

    } else {
      resBody.loginStatus = "Incorrect password"
      res.send(resBody)
    }
  }
})

module.exports = router;
