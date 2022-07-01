const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    landlord: {
        fullName: String,
        phoneNumber: String,
        email: String
    },
    residents: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    reports: [{
        reportId: {
            type: Schema.Types.ObjectId,
            ref: "Report"
        }
    }],
    facility: {
        bed: Number,
        mattress: Number,
        table: Number,
        chair: Number,
        bathroom: Number
    }
});

const House = mongoose.model("House", houseSchema);
module.exports = House;
