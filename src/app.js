const path = require('path')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const tweetRouter = require('./routers/tweet')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(tweetRouter)
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname ,'../public/index.html'))
})

module.exports = app
