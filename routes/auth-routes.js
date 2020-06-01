const router = require("express").Router()
const passport = require('passport')
 // auth login
router.get('/login',(req,res)=> res.render('login.ejs',{user: req.user} ))


//handle with passport
router.get('/logout',(req,res)=> {
    req.logout();   
    res.redirect('/');
});
    


//auth with google
//handle with passport because interracting with google starts
 
router .get('/google', passport.authenticate('google',{
    scope:['profile']
}));
  

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{

res.redirect('/profile/');
 //res.send("You reached the callback URL")
   // res.send(req.user)
})
module.exports = router;