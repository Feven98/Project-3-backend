const express = require('express')
const router = express.Router()

const { User } = require('../models')
const { handleValidateOwnership, requireToken } = require('../middleware/auth')
// const {Post} = require('../models')

// Json body
router.use(express.json())

const db = require('../models')
console.log(User)
// Routes
// INDEX route
router.get('/', async (req,res)=>{
    // res.status(200).json({message: "insta index route"})
    try{
        const allUser = await User.find({}).populate('owner', 'username -_id').exec()
        res.status(200).json(allUser)
    } catch(err){
        res.status(400).json({error: err})
    }
})
// Create route
router.post('/', requireToken, async (req,res)=>{
    console.log('post route', req.body)
    try{
        const owner = req.home._id
        console.log(owner, req.home)
        req.body.owner = owner
        const newUser= await User.create(req.body)
        res.status(201).json(newUser)

    } catch(err){
        res.status(400).json({error: err.message})
    }
    // res.status(200).json({message: "insta create/post route"})
})

// SHOW/GET route
router.get('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta show/get route"})
    try{
        const showUser= await User.findById(req.params.id).populate('owner').exec()
        res.status(201).json(showUser)
    } catch(err){
        res.status(400).json({error:err})
    }
})
// DELETE route
router.delete('/:id', requireToken, async (req,res)=>{
    // res.status(200).json({message: "insta delete/destory route"})
    try{
        handleValidateOwnership(req, await User.findByIdAndDelete(req.params.id))
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(201).json(deletedUser)
    } catch(err) {
        res.status(400).json({error:err})
    }
})
// UPDATE/PUT route
router.put('/:id', requireToken,async (req,res)=>{
    // res.status(200).json({message: "insta updatte/put route"})
    try {
        handleValidateOwnership(req, await User.findByIdAndDelete(req.params.id))
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(201).json(updatedUser)
    } catch(err) {
        res.status(400).json({error:err})
    }
})

module.exports = router