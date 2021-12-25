const mongoose = require('mongoose')

const TweetSchema = mongoose.Schema({
    text:{
        type: String,
        required: true,
        trim: true
    },
    writer:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    replies:[{
        reply:{
            type: String,
            required:false,
            trim: true

        }
    }],
    likes:{
       count:{
        type: Number,
        default:0
       },
       likedBy:[{
        type: mongoose.Types.ObjectId,
        ref: 'User',
       }]
    }

},{
    timestamps: true
})

const Tweet = mongoose.model('Tweet', TweetSchema)
module.exports = Tweet