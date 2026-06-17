const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose.default); //passport adds username and password field by default, also performs hashing and salting

module.exports = mongoose.model("User", userSchema);
//We have used pbkdf2 hashing algorithm