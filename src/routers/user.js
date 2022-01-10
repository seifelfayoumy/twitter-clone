const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const Tweet = require('../models/tweet')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

router.use(cookieParser())
//Sign Up
router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    
    
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie("token",token,{
            httpOnly: true
        })
        res.status(201).send({user,token})
    }catch (e){
        res.status(400).send(e)
    }
})

//Login
router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)

        const token = await user.generateAuthToken()
        res.cookie("token",token,{
            httpOnly: true
        })
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
        res.clearCookie("token")
        await req.user.save()
        res.status(200).send()
    } catch(e){
        res.status(500).send()
    }
})

//get my followers
router.get('/users/me/followers',auth,async(req,res)=>{
    try{
        await req.user.populate('followers.followedBy','username')
        res.status(200).send(req.user.followers)
    }catch(e){
        res.status(400).send()
    }
})

//get my followings
router.get('/users/me/following',auth,async(req,res)=>{
    try{
        await req.user.populate('following.followed','username')
        res.status(200).send(req.user.following)
    }catch(e){
        res.status(400).send()
    }
})

//follow someone
router.post('/users/follow/:username',auth, async(req,res)=>{

    try{
        const user = await User.findOne({username: req.params.username})
        if(user && (!user.equals(req.user))){
            const followerID = mongoose.Types.ObjectId(req.user._id)
            const followingID = mongoose.Types.ObjectId(user._id)
            
            const newFollowers = user.followers.followedBy.filter((follower)=>{
                return !follower.equals(followerID)
            })
            if(user.followers.followedBy.length === newFollowers.length){
                user.followers.followedBy.push(followerID)
                user.followers.count = user.followers.followedBy.length

                req.user.following.followed.push(followingID)
                req.user.following.count = req.user.following.followed.length

                await user.save()
                await req.user.save()
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
router.post('/users/unfollow/:username',auth,async(req,res)=>{

    try{
        const user = await User.findOne({username: req.params.username})
        if(user){
            const followerID = mongoose.Types.ObjectId(req.user._id)
            const followingID = mongoose.Types.ObjectId(user._id)
            
            const newFollowers = user.followers.followedBy.filter((follower)=>{
                return !follower.equals(followerID)
            })

            user.followers.followedBy = newFollowers
            user.followers.count = user.followers.followedBy.length
            await user.save()

            const newFollowing = req.user.following.followed.filter((followed)=>{
                return !followed.equals(followingID)
            })

            req.user.following.followed = newFollowing
            req.user.following.count = req.user.following.followed.length
            await req.user.save()

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
        await user.populate('followers.followedBy','username')
        res.status(200).send(user.followers)
    }catch(e){
        res.status(400).send()
    }
})

//get followings of someone
router.get('/users/:id/following',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        await user.populate('following.followed','username')
        res.status(200).send(user.followers)
    }catch(e){
        res.status(400).send()
    }
})

//get my profile
router.get('/users/me',auth, async(req,res)=>{
    try{
        await req.user.populate('followers.followedBy','username')
        await req.user.populate('following.followed','username')
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//get user by username
router.get('/users/:username' ,async(req,res)=>{
    try{
        const user = await User.findOne({username: req.params.username})
        await user.populate('followers.followedBy','username')
        await user.populate('following.followed','username')
        if(user){
            res.status(200).send(user)
        }
        res.status(404).send()
    }
    catch(e){
        res.status(400).send(e)
    }
})

//change my password
router.patch('/users/me/password',auth,async(req,res)=>{
    try{
        const user = req.user
        user.password = req.body.newPassword
        await user.save()
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//change my name
router.patch('/users/me/name',auth,async(req,res)=>{
    try{
        const user = req.user
        user.name = req.body.newName
        await user.save()
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//change my username
router.patch('/users/me/username',auth,async(req,res)=>{
    try{
        const user = req.user
        user.username = req.body.newUsername
        await user.save()
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})


module.exports = router