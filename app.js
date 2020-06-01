const express = require('express')
const authRoutes = require('./routes/auth-routes.js')
const profileRoutes = require('./routes/profile-routes.js')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys');
const cookieSession = require('cookie-session')
const passport = require('passport')
const app = express()

app.set('view engine','ejs')

app.use(cookieSession({
    maxAge: 240*60*60*1000,
    keys:[keys.session.cookieKey]   //encrypt cookie
}))

//initialize passport

app.use(passport.initialize())
app.use(passport.session())

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,()=> console.log('connected to mongodb'))


app.use('/auth',authRoutes )
app.use('/profile',profileRoutes )


//create home route

app.get('/',(req,res)=> res.render('home.ejs',{user:req.user}))





app.listen(3000,()=> console.log("App npw listening to port 3000")
)
 