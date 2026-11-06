const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose); // adds username and password fields to the schema

const User = mongoose.model("User", userSchema);
module.exports = User;