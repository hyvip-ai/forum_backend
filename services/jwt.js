'use strict'

const jwt = require('jwt-simple')

const mysecret = "This_Is_My_Secret_which_is_None"

function createtoken(user){
    var payload  = {
        name:user.name,
        username:user.username,
        email:user.email,
        sub:user._id,

    }
    var token = jwt.encode(payload,mysecret)
    return token
}

module.exports = {
    createtoken
}