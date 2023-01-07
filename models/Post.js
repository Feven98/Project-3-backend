const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = require('./User')
// const Comment = require('./Comment')

const PostSchema = new mongoose.Schema({
    image: { 
        type: String,
        required: true
    },
    like: Number,
    comment: {
        type: String,
        required : true,
        max: 300
    },
    caption: {
        type: String,
        max : 250
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post