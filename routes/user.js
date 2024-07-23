const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControl = require("../controller/user.js");
 
router
.route("/signup")
.get((req,res)=>{
    res.render('user/signup.ejs');
})
.post(wrapAsync( userControl.signup));


router
.route("/login")
.get((req,res)=>{
    res.render('user/login.ejs');
})
.post(saveRedirectUrl,passport.authenticate('local',{failureRedirect: "/login", failureFlash: true}), wrapAsync(userControl.login));


router.get("/logout",userControl.logout);


module.exports = router;