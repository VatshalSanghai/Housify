const User = require("../models/user.js");

module.exports.signup = async(req,res)=>{
    try{
    let{username,email,password}=req.body;
    const newUser = new User({
        username,
        email,  
    });
   const registeredUser = await User.register(newUser,password);
   req.login(registeredUser, (err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","user was registered");
    res.redirect("/listings");
   })
    
} catch(e){
    req.flash("error", e.message);
    res.redirect("/signup");
}
}

module.exports.login =  async(req,res)=>{
    req.flash("success","logged in successfully!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","successfully logged out!");
        res.redirect("/listings");
    });
}