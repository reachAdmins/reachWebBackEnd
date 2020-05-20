const express = require('express');
const jwt = require('jsonwebtoken')
router = express.Router();
const UserModel = require('../dbModels/userModel');

const authenticate = async (req,res,next) => {

    console.log("Request to /auth")

    const authHeader = req.get('Authorization').split(' ')
    const token = authHeader[1]

    try { 
        const username = jwt.decode(token) 
        console.log(username)
        const doc = await UserModel.findOne( {username: username} ).exec();
    
        if( doc === null ) {
            throw new Error('No user with this token')
        } else if( doc.token !== token ) {
            res.send( {authenticated: false, errorMessage: 'Token does not match existing user'} )
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
        res.send({authenticated: false, errorMessage: 'database / jwt error'})
    }
}

module.exports = authenticate;
