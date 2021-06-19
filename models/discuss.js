'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const QuerySchema = Schema({
    question:String,
    askedby:{type:Schema.ObjectId,ref:'User'},
    answers:Array,
    time:String

})


module.exports = mongoose.model('Query',QuerySchema);