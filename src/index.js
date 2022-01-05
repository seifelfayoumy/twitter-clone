const app = require('./app')
//import app from './app'
const port = process.env.PORT || 3000



app.listen(port, ()=>{
    console.log('server is up on port '+port)
})