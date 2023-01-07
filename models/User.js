const mongoose = require('mongoose')

// schema
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    // liketotal: Number,
    // post: String,
    image: String
}, {timespan: true})

const User = mongoose.model("User", UserSchema)

module.exports = User