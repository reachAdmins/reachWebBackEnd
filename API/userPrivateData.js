const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../dbModels/userModel')
const userPostModel = require('../dbModels/userPostModel')

router = express.Router()

getUserPrivateData = async (username) => {

    const doc = await UserModel.findOne( {username: username} ).exec();
    if(doc === null) {
        return resBody = {
            userNotFound: true,
            username: username
        }
    }

    return resBody = {
        username: doc.username,
        email: doc.email,
        password: doc.password,
        profilePic64: doc.profilePic64,
        points: doc.points,
        createdAt: doc.createdAt,
    }
}

router.get("/userPrivateData", async (req,res) => { console.log('request to /userPrivateData')

    const authHeader = req.get('Authorization').split(' ')
    const token = authHeader[1]
    const username = jwt.decode(token)
    console.log('username: ',username)

    const resBody = await getUserPrivateData(username)
    res.json(resBody)

})

module.exports = router;