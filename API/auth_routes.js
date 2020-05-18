const express = require('express');
const jwt = require('jsonwebtoken')
const authenticateJWT = require('./authenticate.js')
router = express.Router();
const UserModel = require('../dbModels/userModel');


router.get("/auth", authenticateJWT, async (req,res) => {
  console.log('Token authorized')
  res.send({canEditProfile: true})
})

router.get("/canEdit/:username", async (req,res) => {

    // extract token
    const authHeader = req.get('Authorization').split(' ')
    const token = authHeader[1]
    const tokenUsername = jwt.decode(token)

    //get profile data from db
    const doc = await UserModel.findOne( {username: tokenUsername} ).exec();

    if(doc === null) res.send({canEditProfile: false, errorMessage: 'token does not exist'})

    if(token === doc.token) {
      res.send({canEditProfile: true})
    } else {
      res.send({canEditProfile: false, errorMessage: 'token mismatch'})
    }
})

module.exports = router;
