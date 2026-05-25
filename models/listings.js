const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/a-flock-of-birds-flying-over-a-large-building-kTvYL-62ctQ",
        set: (v)=> v === ""
        ? "https://unsplash.com/photos/a-flock-of-birds-flying-over-a-large-building-kTvYL-62ctQ" 
        : v //used for setting a default image in case user provides and image but its not there
    },
    price: Number,
    location: String,
    country: String
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;