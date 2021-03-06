const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) => {
    try{
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        await user.populate('followers.followedBy','username')
        await user.populate('following.followed','username')

        if (!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e){
        res.clearCookie("token")
        res.render('index')
       // res.status(401).send({error: 'please authenticate'})
    }
    
}

module.exports = auth