const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const tweetRouter = require('./routers/tweet')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(tweetRouter)

app.get('',(req,res)=>{
    res.send('hello')
})

module.exports = app
