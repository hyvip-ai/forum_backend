'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = schema({
    name:String,
    username:String,
    email:String,
    password:String
})

module.exports = mongoose.model('User',UserSchema);