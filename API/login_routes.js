const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../dbModels/userModel')
router = express.Router()

// 1. Get username_email and password from front end
// 2. Check if username or email are valid users
// 3. Check if password matches
// 4. Send JWT to front end


router.post("/login", async (req,res) => {

  const user = {
    username: req.body.username_email,
    email: req.body.username_email,
    password: req.body.password
  }

  const resBody = {
    cont: false,
    errorMessage: "",
    token: undefined
  };

  const usernameDoc = await UserModel.findOne( {username: user.username} )

  if( usernameDoc === null) {

    resBody.errorMessage = "No user with this username"
    return res.send(resBody)
  }
  
  if (usernameDoc !== null){
    if (user.password === usernameDoc.password) {

      return res.send({cont: true, token: usernameDoc.token, username: usernameDoc.username})

    } else {
      resBody.errorMessage = "Incorrect password"
      return res.send(resBody)
    }
  }

  const emailDoc = await UserModel.findOne( {email: user.email} )

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
