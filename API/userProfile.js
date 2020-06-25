const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../dbModels/userModel')
const userPostsModel = require('../dbModels/userPostsModel')

router = express.Router()


router.get("/userProfile/:username", async (req,res) => { console.log(`request to /userProfile/${req.params.username}`)

    // userPosts = JSON { postID: {info}, postID1: {info} }
    resBody = {
        userData: undefined,
        userPosts: undefined,
    }

    resBody.userData = await getPublicUserData(req.params.username)

    if(resBody.userData.userNotFound) return res.send(resBody)

    resBody.userPosts = await getUserPosts(req.params.username)
    res.json(resBody)
})

getPublicUserData = async (username) => {

    const doc = await UserModel.findOne( {username: username} ).exec();
    if(doc === null) {
        return userData = {
            userNotFound: true,
            username: username
        }
    }

    return userData = {
        username: doc.username,
        userID: doc._id,
        points: doc.points,
        createdAt: doc.createdAt,
        profilePic64: doc.profilePic64,
        userNotFound: false
    }
}

getUserPosts = async (username) => {

    const userDoc = await UserModel.findOne({username: username})
    const userPostsDoc = await userPostsModel.findById( userDoc.userPostsID )
    return userPostsDoc.posts
}

module.exports = router;