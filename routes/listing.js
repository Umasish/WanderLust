const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
let {isLoggedIn,isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
let{storage}=require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing) 
);


//craete new listing route
/*app.get("/testlisting",async (req,res)=>{
    let sampleListing = new Listing({
        title:"My new vila",
        description:"BY the beach",
        price:450000,
        location:"GOA",
        country:"INDIA"
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing")
})*/
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
    )
    .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
    )



//edit
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing)
);


module.exports=  router;