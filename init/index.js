const express = require("express");
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");
const app =require("../app")
    // const app = express();
// const PORT = 8080;
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Middleware to parse JSON bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Function to connect to MongoDB and initialize data
// async function connectToDB() {
//     try {
//         await mongoose.connect(MONGO_URL);
//         console.log("Connected to DB");

//         await initDB();
//     } catch (err) {
//         console.error("Failed to connect to DB", err);
//         process.exit(1); // Exit the process with failure code
//     }
// }

// async function initDB() {
//     try {
//         await Listing.deleteMany({});
//         await Listing.insertMany(initData.data);
//         console.log("Data was initialized");
//     } catch (err) {
//         console.error("Failed to initialize data", err);
//     }
// }

// // Sample route
// app.get("/", (req, res) => {
//     res.send("Welcome to Wanderlust API");
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     connectToDB();
// });

// const mongoose = require("mongoose");
// const Listing = require("./models/listing"); // Adjust the path as needed
// const initData = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Function to connect to MongoDB and initialize data
async function connectToDB() {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to DB");

        await initDB();
    } catch (err) {
        console.error("Failed to connect to DB", err);
        process.exit(1); // Exit the process with failure code
    }
}

async function initDB() {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("Data was initialized");
    } catch (err) {
        console.error("Failed to initialize data", err);
    }
}

connectToDB();
