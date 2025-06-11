const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async(req,res)=>{
    //console.log("Received Review:", req.body.review);
   let listing= await Listing.findById(req.params.id);
   let newReview = await Review(req.body.review);
   newReview.author  = req.user._id;
   listing.reviews.push(newReview);
   await listing.save();
   await newReview.save();
   req.flash("success","New Review Added");
   res.redirect(`/listings/${listing._id}`)
};

module.exports.destryReview = async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    //await Review.findByIdAndDelete(mongoose.Types.ObjectId(reviewId));
    req.flash("success"," Review Deleted ");
    res.redirect(`/listings/${id}`)

};
