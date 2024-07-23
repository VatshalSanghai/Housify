const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing =  require("../models/listing.js");

const {isLoggedIn} =  require('../middleware.js');
const {isOwner} = require('../middleware.js');
const{validateListing}=require('../middleware.js');

const listcontrol = require("../controller/listing.js");

const multer = require('multer');


const uploadmiddle = require("../middleware.js");

var upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});

router
.route('/')
.get( wrapAsync( listcontrol.index))
.post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync( listcontrol.newList));


router.get("/new",isLoggedIn, listcontrol.new);

router.get("/:id", wrapAsync( listcontrol.id));

router
.route("/:id/update")
.get(isOwner, isLoggedIn,  wrapAsync( listcontrol.idUpdate))
.put(isOwner, isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync( listcontrol.updated));

router.route("/:id/delete")
.get(isOwner, isLoggedIn, wrapAsync(listcontrol.isDelete ))
.delete(isOwner, isLoggedIn, wrapAsync( listcontrol.deleted));



module.exports = router;
