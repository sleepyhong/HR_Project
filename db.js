const mongoose = require("mongoose");
const MONGO_KEY = process.env.MONGO_KEY;

mongoose.connect(MONGO_KEY, (error, client) => {
    if (error) {
        return console.log(error);
    }
    console.log("Connected to db.");
});