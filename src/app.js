

const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('./routers/user')
const tweetRouter = require('./routers/tweet')
const cookieParser = require('cookie-parser')
const auth = require('./middleware/auth')
const authFront = require('./middleware/authFront')
const fetch = require('node-fetch')
const moment = require('moment')



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

app.get('/home',authFront,async(req,res)=>{
    const followers = req.user.followers.followedBy
    const following = req.user.following.followed
    
    res.render('home',{
        followersList: followers,
        followingList: following
    })
})

app.get('/people/:username',async(req,res)=>{

    const username = req.params.username
    const fullUrl = req.protocol + '://' + req.get('host') 
    
    const response = await fetch(fullUrl + '/users/' + username, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()
    
    if(data){
        const tweets = await fetch(fullUrl +'/users/' + data._id+'/tweets',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        var tweetsData = await tweets.json()

        tweetsData = tweetsData.sort((x,y)=>{
            return x.timestamp - y.timestamp
        })

        tweetsData.forEach((tweet)=>{
            tweet.createdAt = moment(tweet.createdAt).format('DD MM YYYY hh:mm a')
        })

        

       
        res.render('profile',{
            name: data.name,
            id: data._id,
            username: data.username,
            followerCount: data.followers.count,
            followingCount: data.following.count,
            tweets: tweetsData,
            followersList: data.followers.followedBy,
            followingList: data.following.followed

        })
    }
})

module.exports = app
//export default app
