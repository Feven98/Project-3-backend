const mongoose = require('mongoose')

// schema
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    caption: String,
    post: String,
    image: String,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
      required: true
    }
}, {timespan: true})

const User = mongoose.model("User", UserSchema)

module.exports = User