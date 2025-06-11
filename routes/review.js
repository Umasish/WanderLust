const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
let {validateReview, isLoggedIn,reviewAuthor} =require("../middleware.js")

const reviewController = require("../controllers/reviews.js");

// Review post route
router.post("/",
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview)
);

//Review delete route
router.delete("/:reviewId",
    isLoggedIn,
    reviewAuthor,
    wrapAsync(reviewController.destryReview)
);

module.exports = router;
