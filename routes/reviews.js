const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review =  require("../models/review.js");
const Listing =  require("../models/listing.js");
const {validateReview, isLoggedIn} = require("../middleware.js");
const reviewControl =   require("../controller/review.js");

router.post("/",isLoggedIn, validateReview, wrapAsync(reviewControl.updateReview ));

router.delete("/:reviewId",isLoggedIn, wrapAsync(reviewControl.deleteReview));

module.exports = router;