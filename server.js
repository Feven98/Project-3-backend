// import express
const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')

// controller import
const userController = require('./controllers/user-controller')
const postcontroller = require('./controllers/post-controller')
const commentController = require('./controllers/comment-controller')
const authController = require('./controllers/auth-controller')

require("dotenv").config()
require('./config/db.connection') // node runs all of code in db.connection

const { PORT, MONGODB_URI } = process.env

// app middleware(express)
app.use(express.json())

// cors function
app.use(cors())
// morgan function
app.use(morgan('dev'))

app.use('/post', postcontroller)
app.use('/comment', commentController)
app.use('/user', userController)
app.use('/auth', authController)
// root router
app.get('/', (req,res) => res.redirect('/user'))

app.listen(PORT, () => console.log(`Listening for client requests on port: ${PORT}`));