const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('./routers/user')
const tweetRouter = require('./routers/tweet')
const cookieParser = require('cookie-parser')
const auth = require('./middleware/auth')

const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


const app = express()


app.set('view engine','hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)



app.use(express.json())
app.use(userRouter)
app.use(tweetRouter)

app.use(cookieParser())

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/home',auth,(req,res)=>{
    res.render('home')
})

app.get('/home/me',auth,(req,res)=>{
    res.render('profile')
})

module.exports = app
