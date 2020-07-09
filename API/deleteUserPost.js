const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../dbModels/userModel')
const userPostsModel = require('../dbModels/userPostsModel')
router = express.Router()

router.post("/deleteUserPost", async (req,res) => { console.log('Request to /deleteUserPost')

  const postData = req.body

  const resBody = {
    cont: false,
    errorMessage: ""
  };

  const userDoc = await UserModel.findById(postData.userID)

  if( userDoc === null) {
    resBody.errorMessage = "Could not locate userID"
    return res.send(resBody)
  }

  if( userDoc.token !== postData.token) {
    resBody.errorMessage = "incorrect token for user"
    return res.send(resBody)
  }

  const postsDoc = await userPostsModel.findById(userDoc.userPostsID)
  const delObjIndex = postsDoc.posts.findIndex( postObj => postObj._id = postData.postID)
  postsDoc.posts.splice(delObjIndex,1)
  postsDoc.save()

  resBody.cont = true
  return res.send(resBody)

})

module.exports = router;
