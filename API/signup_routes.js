const express = require('express');
const UserModel = require('../dbModels/userModel');
const jwt = require('jsonwebtoken')
router = express.Router();

router.post("/signup", async (req,res) => { console.log("Request to /signup")

  const resBody = {
    cont: false,
    errorMessage: '',
    jwt: '',
  }

  const insertUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    points: 0,
    profilePic64: '',
    createdAt: '',
    token: ''
  }

  const usernameDoc = await UserModel.findOne( {username: insertUser.username} )
  const emailDoc = await UserModel.findOne( {email: insertUser.email} )

  if( usernameDoc !== null ) {
    resBody.errorMessage = 'This username already exists'
    return res.send(resBody)
  } 
  
  if( emailDoc !== null ) {
    resBody.errorMessage = 'Email already associated with existing account'
    return res.send(resBody)
  }

  const date = new Date()
  insertUser.createdAt = `${date.getMonth()}.${date.getDate()}.${date.getFullYear()}`
  insertUser.token = jwt.sign(insertUser.username,'abcd')

  const newUser = new UserModel(insertUser);
  newUser.save(function (err, newUser) {
    if (err) return console.error(err);
    resBody.cont = true
    resBody.token = insertUser.token
    res.send(resBody)
  })
})

module.exports = router;