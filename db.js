const mongoose = require("mongoose");
const { MONGO_KEY } = process.env;

mongoose.connect(MONGO_KEY, (error, client) => {
    if (error) {
        return console.log(error);
    }
    console.log("Connected to db.");
});