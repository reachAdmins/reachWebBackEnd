const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userID: String,
    createdAt: String,
    postText: String,
    postImage64: String
})

const userPosts = new mongoose.Schema({
    userID: String,
    username: String,
    posts: [postSchema]
})

const userPostsModel = mongoose.model('user_post', userPosts);
module.exports = userPostsModel;