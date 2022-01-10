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


        res.status(201).send(tweet)
    }catch(e){
        res.status(400).send()
    }
   
    


})

//read my tweets
router.get('/tweets/me',auth, async(req,res)=>{
    try{
        const tweets = await Tweet.find({writer: req.user._id})
        res.status(200).send(tweets)
    }catch(e){
        res.status(400).send(e)
    }
   

})

//open tweet
router.get('/tweets/:id', async(req,res)=>{

    try{

        const tweet = await Tweet.findById(req.params.id)
        res.status(200).send(tweet.text)
    }catch(e){
        res.status(400).send(e)
    }
})

//like tweet
router.post('/tweets/:id/like',auth,async(req,res)=>{
    try{
        const tweet = await Tweet.findById(req.params.id)
        const userID = mongoose.Types.ObjectId(req.user._id)
        const newLikes = tweet.likes.likedBy.filter((user)=>{
            return !user.equals(userID)
        })
        if(tweet.likes.likedBy.length === newLikes.length){
            tweet.likes.likedBy.push(userID)

            tweet.likes.count = tweet.likes.likedBy.length
    
            await tweet.save()
        }
        
       
        res.status(200).send(tweet)


    }catch(e){
        res.status(400).send(e)
    }
})

//unlike tweet
router.post('/tweets/:id/unlike',auth,async(req,res)=>{
    try{
        const tweet = await Tweet.findById(req.params.id)
        const userID = mongoose.Types.ObjectId(req.user._id)
        const newLikes = tweet.likes.likedBy.filter((user)=>{
            return !user.equals(userID)
        })

        tweet.likes.likedBy = newLikes
        tweet.likes.count = tweet.likes.likedBy.length
        await tweet.save()
      
        res.status(200).send(tweet)
    }catch(e){
        res.status(400).send(e)
    }
})

//get tweets for timeline
router.get('/tweets/me/timeline',auth,async (req,res)=>{

    try{
        await req.user.populate('following.followed','tweets')
        const tweets = req.user.following.followed.tweets
        console.log(tweets)
        res.status(200).send()
    }
    catch(e){
        res.status(400).send(e)
    }
})

//delete tweet
router.delete('/tweets/:id',auth,async(req,res)=>{
    try{
        const tweet = await Tweet.findById(req.params.id)
        const userID = mongoose.Types.ObjectId(req.user._id)
        if(tweet && tweet.writer.equals(userID)){
            await Tweet.deleteOne({_id: tweet._id})
            res.status(200).send(tweet)
        }else{
            res.status(404).send('tweet not found')
        }
        
    }catch(e){
        res.status(400).send(e)
    }
})





module.exports = router