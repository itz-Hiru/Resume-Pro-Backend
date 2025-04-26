const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Setup MongoDB database
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected.");
    } catch (error) {
        console.error("Error while connecting to MongoDB", error);
        process.exit(1);
    }
};

module.exports = connectDB;
