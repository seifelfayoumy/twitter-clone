const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    about:{
        type: String,
        required: false,
        trim: true

    },
    followers:{
        count:{
            type: Number,
            default: 0
        },
        followedBy:[{
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }]
    },
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
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new error('user not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error('unable to login')
    }

    return user


}

userSchema.methods.generateAuthToken =  async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET,{expiresIn: "1h"})

    user.tokens = user.tokens.concat({token})
    await user.save()

    

    return token
}

userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})



const User = mongoose.model('User', userSchema)

module.exports = User