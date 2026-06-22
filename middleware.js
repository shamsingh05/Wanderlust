const Listing = require("./models/listings");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");//destructuring

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => { //because passport resets req.session by default, so we store it in locale, which are available everywhere
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){ //to check if curr user is the owner of the listing or not
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) => {
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


module.exports.validateReview = (req,res,next) => {
    if(!req.body){
        return next(
            new ExpressError(400,"Request body is missing")
        );
    }
    const { error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details
            .map(el => el.message)
            .join(", ");

        throw new ExpressError(400, errMsg);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){ //to check if curr user is the owner of the listing or not
        req.flash("error", "You did not create this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}