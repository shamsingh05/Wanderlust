require("dotenv").config();

const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const geocodingClient = mbxGeocoding({
    accessToken: process.env.MAP_TOKEN,
});

const initData = require("./data.js");
const Listing = require("../models/listings.js");

const dbUrl = process.env.ATLASDB_URL;

main();

async function main() {
    await mongoose.connect(dbUrl);
    console.log("Connected to Atlas");

    await initDB();

    mongoose.connection.close();
}

async function initDB() {

    await Listing.deleteMany({});

    for (let obj of initData.data) {

        let response = await geocodingClient
            .forwardGeocode({
                query: `${obj.location}, ${obj.country}`,
                limit: 1,
            })
            .send();

        obj.geometry = response.body.features[0].geometry;

        obj.owner = "6a32ba12b845daaa73f28cff";

        await Listing.create(obj);
    }

    console.log("Database initialized!");
}