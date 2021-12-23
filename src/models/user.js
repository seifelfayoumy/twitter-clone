const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }

    },
    about:{
        type: String,
        required: false,
        trim: true

    },
    followers:[this],
    password:{
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain the word password')
            }
        }
    },
})

userSchema.virtual('tweets',{
    ref: 'Tweet',
    localField: '-id',
    foreignField: 'writer'
})

const User = mongoose.model('User', userSchema)

module.exports = User