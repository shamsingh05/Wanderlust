const Listing = require("../models/listings");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;
// Only init Mapbox when a real token is present (starts with pk. or sk.)
const hasValidMapToken =
    typeof mapToken === "string" &&
    (mapToken.startsWith("pk.") || mapToken.startsWith("sk."));//public tokens begin with pk and secret with sk
const geocodingClient = hasValidMapToken
    ? mbxGeocoding({ accessToken: mapToken })
    : null;

// Fallback coords when Mapbox is not configured
const DEFAULT_GEOMETRY = {
    type: "Point",
    coordinates: [77.209, 28.6139], // New Delhi
};

async function geocodeLocation(locationQuery) {
    if (!geocodingClient || !locationQuery) {
        return DEFAULT_GEOMETRY;
    }
    try {
        const response = await geocodingClient
            .forwardGeocode({
                query: locationQuery,
                limit: 1,
            })
            .send();
        const feature = response.body.features[0];
        if (feature && feature.geometry) {
            return feature.geometry;
        }
    } catch (err) {
        console.warn("Mapbox geocoding failed, using default geometry:", err.message);
    }
    return DEFAULT_GEOMETRY;
}

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    // console.log("Listings found:", allListings.length);
    res.render("listings/index", { allListings });
}

module.exports.renderNewForm =  (req,res)=>{
    res.render("listings/new.ejs")
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing}); 
};

module.exports.createListing = async (req,res)=>{
    let url = req.file.path;
    let filename =  req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = await geocodeLocation(req.body.listing.location);

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async (req,res)=>{
        let {id} = req.params;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing});
        
        if(typeof req.file !== "undefined"){
            let url = req.file.path;
            let filename =  req.file.filename;
            listing.image = {url, filename};
            await listing.save() ;
        }

        req.flash("success", "Listing updated!");
        res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res)=>{
        let {id} = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
};