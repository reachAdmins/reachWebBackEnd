const express = require('express');
const jwt = require('jsonwebtoken')
const authenticateJWT = require('./authenticate.js')
router = express.Router();
const UserModel = require('../dbModels/userModel');


router.get("/auth", authenticateJWT, async (req,res) => {
  res.send({authenticated: true})
})

router.get("/canEdit/:username", async (req,res) => { console.log(`request to /canEdit/${req.params.username}`)

    const authHeader = req.get('Authorization').split(' ')
    const token = authHeader[1]


    const doc = await UserModel.findOne( {username: req.params.username} ).exec();

    if(doc === null) return res.send({canEditProfile: false, errorMessage: 'token does not exist'})

    if(token === doc.token) {
      res.send({canEditProfile: true})
    } else {
      res.send({canEditProfile: false, errorMessage: 'token mismatch'})
    }
})

module.exports = router;
