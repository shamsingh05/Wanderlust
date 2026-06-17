const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");//destructuring
const Listing = require("../models/listings.js");
const {isLoggedIn} = require("../middleware.js");

const validateListing = (req,res,next) => {
    if(!req.body){
        return next(
            new ExpressError(400,"Request body is missing")
        );
    }
    const { error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details
            .map(el => el.message)
            .join(", ");

        throw new ExpressError(400, errMsg);
    }
    next();
}

//Index route
router.get("/", wrapAsync( async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}))

//New Route
router.get("/new", isLoggedIn, (req,res)=>{
    res.render("listings/new.ejs")
});

//Show Route
router.get("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing}); 
}))


//Create Route
router.post(
    "/",
    isLoggedIn,
    validateListing, 
    wrapAsync(async (req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New listing Created!");
    res.redirect("/listings");
}))

//Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
}))

//Update Route
router.put("/:id", isLoggedIn, validateListing, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing});
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
}))

//delete route
router.delete("/:id", isLoggedIn, wrapAsync( async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}))

module.exports = router;