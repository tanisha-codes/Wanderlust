
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("Connection successful");

    await initDB();

    await mongoose.connection.close();
    console.log("Database connection closed");
}

const initDB = async () => {
    // WARNING: This deletes all existing listings!
    await Listing.deleteMany({});

    const updatedData = initData.data.map((obj) => ({
        ...obj,
        owner: "6adf81bf5a83fca53d2ac72f"
    }));

    console.log("Geometry before insertion:", updatedData[0].geometry);

    await Listing.insertMany(updatedData);

    const savedListing = await Listing.findOne({
        title: updatedData[0].title
    });

    console.log("Geometry after insertion:", savedListing.geometry);
    console.log("Data was initialized successfully");
};

main().catch(async (err) => {
    console.error("Initialization error:", err);
    await mongoose.connection.close();
});
