const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const Tweet = require('../models/tweet')
const mongoose = require('mongoose')

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
router.post('/users/logout',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send()
    }
})

//get my followers
router.get('/users/me/followers',auth,async(req,res)=>{
    try{
        res.status(200).send(req.user.followers)
    }catch(e){
        res.status(400).send()
    }
})

//follow someone
router.post('/users/follow/:id',auth, async(req,res)=>{

    try{
        const user = await User.findById(req.params.id)
        if(user){
            const followerID = mongoose.Types.ObjectId(req.user._id)
            
            const newFollowers = user.followers.followedBy.filter((follower)=>{
                return !follower.equals(followerID)
            })
            if(user.followers.followedBy.length === newFollowers.length){
                user.followers.followedBy.push(followerID)
                user.followers.count = user.followers.followedBy.length
                await user.save()
            }
            res.status(200).send(user)
        }else{
            res.status(404).send()
        }
        

    }catch(e){
        res.status(400).send(e)
    }
})

//unfollow someone
router.post('/users/unfollow/:id',auth,async(req,res)=>{

    try{
        const user = await User.findById(req.params.id)
        if(user){
            const followerID = mongoose.Types.ObjectId(req.user._id)
            
            const newFollowers = user.followers.followedBy.filter((follower)=>{
                return !follower.equals(followerID)
            })

            user.followers.followedBy = newFollowers
            user.followers.count = user.followers.followedBy.length
            await user.save()
            res.status(200).send(user)
        }
        res.status(404).send()

    }catch(e){
        res.status(400).send(e)
    }
})

//get tweets of someone
router.get('/users/:id/tweets',async(req,res)=>{

    try{
        const user = await User.findById(req.params.id)
        const tweets = await Tweet.find({writer: user._id})
        res.status(200).send(tweets)
    }catch(e){
        res.status(400).send(e)
    }
})

//get followers of someone
router.get('/users/:id/followers',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).send(user.followers)
    }catch(e){
        res.status(400).send()
    }
})


module.exports = router