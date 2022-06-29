const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    dateCreated: {
        type: Date,
        requried: true
    },
    userEmail: {
        type: String,
        required: true
    }
});

const RegisterToken = mongoose.model("RegisterToken", registerTokenSchema);
module.exports = RegisterToken;