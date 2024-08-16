const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // Adjust the path as needed

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    // Update all listings to set the 'owner' field to null
    await Listing.updateMany({}, { $unset: { owner: "" } });

    console.log("Owner field values removed from all listings");
    mongoose.connection.close();
}

main().catch((err) => {
    console.error(err);
});
