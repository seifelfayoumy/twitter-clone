const express = require('express')
const Tweet = require('../models/tweet')
const router = new express.Router()

//publish tweet
router.post('/tweets', async(req,res)=>{

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