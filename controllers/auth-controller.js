const express = require('express')
const router= express.Router()
const {Home} = require('../models')

const bcrypt = require('bcrypt')
// SIGN UP
// POST /auth/register
router.post("/register", async (req, res, next) => {

try{
    const salt = await bcrypt.genSalt(10)

    const passwordHash = await bcrypt.hash(req.body.password, salt)
    req.body.password = passwordHash

    const newUser = await Home.create(req.body)

    res.status(201).json({user: newUser, isLoggedIn: true})
}catch(err){
    res.status(400).json({err: err.message})
}
});
// SIGN IN
// POST /auth/login
router.post("/login", async (req, res, next) => {});



module.exports = router