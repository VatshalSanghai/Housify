const Listing = require("./models/listing.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Upload = require("./cloudConfig.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error",'you  must be logged in to  create listing!');
        return res.redirect('/login');
     }
     next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner =async(req,res,next)=>{
    const {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
        {
      req.flash("error","You don't have access to edit");
     return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
        next();
    }
 };

 module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
        next();
    }
 };

//  module.exports.uploader =  async(req,res,next)=>{
//     try{
//         const upload = await Upload.uploadfile(req.file.path);
//     }catch(err){
//         res.send(err);
//     }
//  }