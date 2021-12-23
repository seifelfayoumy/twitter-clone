const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

//Sign Up
router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch (e){
        res.status(400).send(e)
    }
})

//Login
router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)

        const token = user.generateAuthToken()
        res.status(200).send({user, token})
        
    }catch(e){
        res.status(400).send(e)
    }
})

//logout
router.post('/users/logout', async(req,res)=>{

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