const express = require('express');
const UserModel = require('../dbModels/userModel');
const userPostsModel = require('../dbModels/userPostModel')
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
    token: '',
    postsDocID: ''
  }

  // 1. If username exists, return res
  const usernameDoc = await UserModel.findOne( {username: insertUser.username} )
  if( usernameDoc !== null ) {
    resBody.errorMessage = 'This username already exists'
    return res.send(resBody)
  } 

  // 2. If email exists, return res
  const emailDoc = await UserModel.findOne( {email: insertUser.email} )
  if( emailDoc !== null ) {
    resBody.errorMessage = 'Email already associated with existing account'
    return res.send(resBody)
  }

  // 3. Create new userPostsDoc
  const emptyPostsDoc = {
    userID: '',
    username: '',
    posts: []
  }

  const newUserPosts = await userPostsModel(emptyPostsDoc).save()
  
  // 4. Create new userDoc
  const date = new Date()
  insertUser.createdAt = `${date.getMonth()}.${date.getDate()}.${date.getFullYear()}`
  insertUser.token = jwt.sign(insertUser.username,'abcd')
  insertUser.userPostsID = newUserPosts._id

  const newUser = await UserModel(insertUser).save()

  newUserPosts.userID = newUser._id
  newUserPosts.username = newUser.username
  newUserPosts.save()

  resBody.cont = true
  resBody.token = insertUser.token
  res.send(resBody)
})

module.exports = router;