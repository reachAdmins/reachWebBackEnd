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

router.get("/profile/:username", async (req,res) => {

    // Get and send public user data from db
    const resBody = await getPublicUseRData(req.params.username)
    res.json(resBody)
})

module.exports = router;