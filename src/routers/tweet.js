const express = require('express')
const Tweet = require('../models/tweet')
const router = new express.Router()
const auth = require('../middleware/auth')
const mongoose = require('mongoose')

//publish tweet
router.post('/tweets',auth, async(req,res)=>{
    try{
        const tweet = new Tweet({text : req.body.text, writer: mongoose.Types.ObjectId(req.user._id)})

        await tweet.save()

        const tweetID = mongoose.Types.ObjectId(tweet._id)
        req.user.tweets = req.user.tweets.concat({tweet})
        await req.user.save()

        res.status(201).send()
    }catch(e){
        res.status(400).send()
    }
   
    


})

//read my tweets
router.get('/tweets/me', async(req,res)=>{

})

//open tweet
router.get('/tweets/:id', async(req,res)=>{

})

//like tweet
router.post('/tweets/:id/like',async(req,res)=>{

})



module.exports = router