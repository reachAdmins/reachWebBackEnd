const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userData: {
        userID: String,
        token: String,
      },
      postData: {
        createdAt: String,
        postText: String,
        postImage: String
    }
})

const userPosts = new mongoose.Schema({
    userID: String,
    username: String,
    posts: [postSchema]
})

const userPostsModel = mongoose.model('user_post', userPosts);
module.exports = userPostsModel;