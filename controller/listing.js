const Listing = require("../models/listing.js");
const Upload = require("../cloudConfig.js");

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings});
}

module.exports.new = (req,res)=>{
  
    res.render("listings/new.ejs");
 }



module.exports.id = async (req,res)=>{
    const a = req.params;
    const d1 = await Listing.findById(a.id).populate({path :"reviews",populate:{path:"author"}}).populate("owner");
    if(!d1){
       req.flash("error","Does not exist!");
       res.redirect("/listings");
    }
    res.render("listings/detail.ejs", {d1});
 }


 module.exports.idUpdate = async (req,res)=>{
    const {id} = req.params;
    const d1  = await Listing.findById(id);
    if(!d1){
       req.flash("error","Does not exist!");
       res.redirect("/listings");
    }
    res.render("listings/update.ejs", {d1});
 }

 module.exports.isDelete = async (req,res)=>{
    const {id} = req.params;
    const d1  = await Listing.findById(id);
    res.render("listings/delete.ejs", {d1});
 }

 module.exports.newList = async(req,res)=>{
   const upload = await Upload.uploadfile(req.file.path); 
    const s = new Listing(req.body.listing);
    s.owner = req.user._id;
   s.image = upload.secure_url;
     await s.save();
     req.flash('success',"new listing formed")
     res.redirect("/listings");
}

module.exports.updated = async(req,res)=>{
 
    const {id} = req.params;
   
    let listing = await Listing.findByIdAndUpdate(id,req.body.listing);
    if(typeof req.file !== "undefined"){
      const upload = await Upload.uploadfile(req.file.path);
       listing.image = upload.secure_url;
    await listing.save();
    }
   
     req.flash('success',"Updated successfully!")
     res.redirect(`/listings/${id}`);
}

module.exports.deleted = async(req,res)=>{
    const {id}= req.params;
    const ans = req.body;
    if(ans.yes == ""){
        await Listing.findByIdAndDelete(id);
    }
    req.flash('success',"Listing deleted")
        res.redirect("/listings");
 }

