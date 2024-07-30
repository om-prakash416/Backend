// const express = require("express");
// const app = express();
// const mongoose = require("mongoose")

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// main()
//     .then(() => {
//         console.log("Connected to DB");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }
// app.get("/", (req, res) => {
//     res.send("Hi,I am root");

// });
// app.listen(8080, () => {
//     console.log("server is listening to port 8080");
// });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing") 
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;
// Function to connect to MongoDB
async function connectToDB() {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to DB");
    } catch (err) {
        console.error("Failed to connect to DB", err);
        process.exit(1); // Exit the process with failure code
    }
}

// Root route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.get("/testListening", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location:"Catangute"
//     });

//     await sampleListin g.save();
//     console.log("sample was saved");
//     res.send("successful testing")
// })

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("/listings/index.ejs", { allListings });
        console.log(res);
    });


// Start the server after connecting to the database
async function startServer() {
    await connectToDB();
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

startServer();
