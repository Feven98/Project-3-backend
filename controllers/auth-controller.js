const express = require('express')
const router= express.Router()
const {Home} = require('../models')

const {createUserToken} = require('../middleware/auth')

const bcrypt = require('bcrypt')
// SIGN UP
// POST /auth/register
router.post("/register", async (req, res, next) => {

try{
    const salt = await bcrypt.genSalt(10)

    const passwordHash = await bcrypt.hash(req.body.password, salt)
    const rawPWStore = req.body.password

    req.body.password =  passwordHash

    const newUser = await Home.create(req.body)
    if(newUser){ 
        req.body.password = rawPWStore
        const authenticatedUserToken = createUserToken(req, newUser);
    res.status(201).json({
        home: newUser, 
        isLoggedIn: true, 
        token: authenticatedUserToken })
    } else{
        res.status(400).json({error: "Something went wrong"})
    }
 //s
}catch(err){
    res.status(400).json({err: err.message})
}
});
// SIGN IN
// POST /auth/login
// SIGN IN
// POST /auth/login
router.post("/login", async (req, res, next) => {
    try {
      const loggingUser = req.body.username;
      const foundUser = await Home.findOne({ username: loggingUser });
      const token = await createUserToken(req, foundUser);
      res.status(200).json({
        home: foundUser,
        isLoggedIn: true,
        token,
      });
    } catch (err) {
    
      res.status(401).json({ error: err.message });
    }
  });
  
  
//testing


module.exports = router