const passport = require('passport')
const GoogleStrategy =require('passport-google-oauth20')
const keys = require('./keys');
const User = require('../models/user-model.js')

passport.serializeUser((user,done)=>
    done(null,user.id)
    
    )

    passport.deserializeUser((id,done)=>
   User.findById(id).then((user)=>
   done(null,user)
   )
    
    ) 
 
passport.use(
    new GoogleStrategy({

        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
        },(accessToken,refreshToken,profile,done)=>{
            //passport call back function
            //check if user already exists in our db
            
            User.findOne({googleId:profile.id}).then((currentUser)=> {
            if(currentUser)
            {
                console.log("User is already there and user is" + currentUser)
                done(null,currentUser) 
            }
            else{
                
            new User({
                username:profile.displayName,
                googleId:profile.id
            }).save().then((newUser)=> console.log('new user was created' + newUser)
            )
            done(null,newUser)
            }})


        //console.log("Passport callback function fired");
           // console.log(profile);

            // new User({
            //     username:profile.displayName,
            //     googleId:profile.id
            // }).save().then((newUser)=> console.log('new user was created' + newUser)
            // )
            
            
        }
))




