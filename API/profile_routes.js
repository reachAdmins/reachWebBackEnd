const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../dbModels/userModel')

router = express.Router()


getPublicUserData = async (username) => {

    const doc = await UserModel.findOne( {username: username} ).exec();
    if(doc === null) {
        return resBody = {
            userNotFound: true,
            username: username
        }
    }

    return resBody = {
        username: doc.username,
        points: doc.points,
        createdAt: doc.createdAt,
        profilePic64: doc.profilePic64,
        userNotFound: false
    }
}

getPrivateUserData = async (username) => {

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


router.get("/getUserPublicData/:username", async (req,res) => { console.log('request to /getUserPublicData')

    const resBody = await getPublicUserData(req.params.username)
    res.json(resBody)

})

router.get("/getPrivateUserData", async (req,res) => { console.log('request to /getPrivateUserData')

    const authHeader = req.get('Authorization').split(' ')
    const token = authHeader[1]
    const username = jwt.decode(token)
    console.log('username: ',username)

    const resBody = await getPrivateUserData(username)
    res.json(resBody)

})

module.exports = router;