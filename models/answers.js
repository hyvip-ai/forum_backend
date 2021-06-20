'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const AnswerSchema = Schema({
    question:{type:Schema.ObjectId,ref:'Query'},
    answerdby:{type:Schema.ObjectId,ref:'User'},
    answer:String,
    right:Number,
    time:String,
    clicked:Array
})


module.exports = mongoose.model('Answer',AnswerSchema)