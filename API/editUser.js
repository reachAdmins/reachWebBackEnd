const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../dbModels/userModel')
const authenticate = require('./authenticate.js')


router = express.Router()

router.post("/editUser", async (req,res) => { console.log("Request to /editUser")

    const resBody = {
        cont: false,
        errorMessage: '',
        token: ""
    }

    reqJWT = req.get('Authorization')
    const bearer = reqJWT.split(' ')
    const token = bearer[1]
    const tokenUsername = jwt.decode(token)

    const insertUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        token: jwt.sign(req.body.username,'abcd'),
    }

    //validate new fields

    const updateDoc = await UserModel.findOne( {username: tokenUsername} )

    updateDoc.username = insertUser.username
    updateDoc.email = insertUser.email
    updateDoc.password = insertUser.password
    updateDoc.token = insertUser.token

    await updateDoc.save()
    if(updateDoc === null) {
        resBody.errorMessage = "Could not update user information"
        return res.send(resBody)
    } else {
        resBody.cont = true
        resBody.token = insertUser.token
    
        res.send(resBody)
    }    
})

module.exports = router;