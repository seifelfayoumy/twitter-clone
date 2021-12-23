const express = require('express')
const User = require('../models/user')
const router = new express.Router()

//Sign Up
router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
       
        res.status(201).send({user})
    }catch (e){
        res.status(400).send(e)
    }
})

//Login
router.get('/users/me',async (req,res)=>{

})

//get my followers
router.get('/users/me/followers',async(req,res)=>{

})

//follow someone
router.post('/users/follow/:id', async(req,res)=>{

})

//get tweets of someone
router.get('/users/:id/tweets',async(req,res)=>{

})

//get followers of someone
router.get('/users/:id/followers',async(req,res)=>{
    
})


module.exports = router