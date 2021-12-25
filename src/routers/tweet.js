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

//delete tweet
//STILL WORKING ON IT (CAN'T DELETE TWEET)
router.delete('/tweets/:id',auth,async(req,res)=>{
    try{
        const tweet = await Tweet.findById(req.params.id)
        const userID = mongoose.Types.ObjectId(req.user._id)
        if(tweet.writer.equals(userID)){
            Tweet.deleteOne({_id: tweet._id},(e)=>{
                if(e){
                    res.status(400).send(e)
                }
                
            })
        }
        res.status(200).send(tweet)
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = router