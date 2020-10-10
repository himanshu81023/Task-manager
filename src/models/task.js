const mongoose = require('mongoose')
const User = require('../models/user')

const taskSchema =  new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref :'User'

    }},{timestamps:true})// default value of timestamps is false
    
const Task = mongoose.model('Task',taskSchema)

module.exports = Task