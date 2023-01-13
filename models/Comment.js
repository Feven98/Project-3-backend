const mongoose = require('mongoose')
// const User = require('./User')
// const Post = require('./Post')

const CommentSchema = new mongoose.Schema({
    id: { 
        type: Number
    },
    comment: {
        type: String,
        required : true,
        max: 300
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, {timestamps: true}) 

const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment