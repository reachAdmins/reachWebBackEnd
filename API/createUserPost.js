const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../dbModels/userModel')
const userPostsModel = require('../dbModels/userPostsModel')
router = express.Router()

router.post("/createUserPost", async (req,res) => { console.log('Request to /createUserPost')

  const postData = req.body
  
  console.log(postData)

  const resBody = {
    cont: false,
    errorMessage: ""
  };

  const userDoc = await UserModel.findById(postData.userData.userID)

  if( userDoc === null) {
    resBody.errorMessage = "Could not locate userID"
    return res.send(resBody)
  }

  if( userDoc.token !== postData.userData.token) {
    resBody.errorMessage = "incorrect token for user"
    return res.send(resBody)
  }

  const insertPost = {
    userID: postData.userData.userID,
    createdAt: postData.postData.createdAt,
    postText: postData.postData.postText,
    postImage64: postData.postData.postImage64
  }

  const postsDoc = await userPostsModel.findById( userDoc.userPostsID)
  postsDoc.posts.push(insertPost)
  postsDoc.save()

  resBody.cont == true
  return res.send(resBody)

})

module.exports = router;
