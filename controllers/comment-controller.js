const express = require('express')
const router = express.Router()

const {User} = require('../models')
const {Comment} = require('../models')

// Json body
router.use(express.json())

const db = require('../models')
console.log(Comment)
// Routes
// INDEX route
router.get('/', async (req,res)=>{
    // res.status(200).json({message: "insta index route"})
    try{
        const allComment = await Comment.find({})
        res.status(200).json(allComment)
    } catch(err){
        res.status(400).json({error: err})
    }
})
// Create route
router.post('/', async (req,res)=>{
    console.log('post route', req.body)
    try{
        const newComment= await Comment.create(req.body)
        res.status(201).json(newComment)

    } catch(err){
        res.status(400).json({error:err})
    }
    // res.status(200).json({message: "insta create/post route"})
})

// SHOW/GET route
router.get('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta show/get route"})
    try{
        const showComment= await Comment.findById(req.params.id)
        res.status(201).json(showComment)
    } catch(err){
        res.status(400).json({error:err})
    }
})
// DELETE route
router.delete('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta delete/destory route"})
    try{
        const deletedComment = await Comment.findByIdAndDelete(req.params.id)
        res.status(201).json(deletedComment)
    } catch(err) {
        res.status(400).json({error:err})
    }
})
// UPDATE/PUT route
router.put('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta updatte/put route"})
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(201).json(updatedComment)
    } catch(err) {
        res.status(400).json({error:err})
    }
})
module.exports = router