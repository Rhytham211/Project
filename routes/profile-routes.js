const router = require('express').Router();

const authCheck = (req,res,next)=>{
    if(!req.user){

        //executes if user not loggen in
        res.redirect('/auth/login');
    }else{
        // logged in 
        next();
    }
}

router.get('/',authCheck,(req,res)=>{
    res.render('profile',{user: req.user});
})

module.exports = router;