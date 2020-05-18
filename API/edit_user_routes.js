const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../dbModels/userModel')
const authenticate = require('./authenticate.js')


router = express.Router()

router.post("/editUserData", async (req,res) => {

    // define resBody
    const resBody = {
        cont: false,
        errorMessage: ''
    }

    // extract and decode JWT
    reqJWT = req.get('Authorization')
    const bearer = reqJWT.split(' ')
    const token = bearer[1]
    const username = jwt.decode(token)

    // extract reqBody
    const insertUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    console.log('editUser reqData: ',insertUser)

    // get user docID
    const updateDoc = await UserModel.findOne({username: username})

    // edit user info
    updateDoc.username = insertUser.username
    updateDoc.email = insertUser.email
    updateDoc.password = insertUser.password
    updateDoc.save().then(() => {
        resBody.cont = true
        res.send(resBody)
    })
    .catch(() => {
        res.send(resBody)
    })
})

module.exports = router;