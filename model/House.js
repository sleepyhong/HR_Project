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
        bed: {
            type: Number,
            default: null
        },
        mattress: {
            type: Number, 
            default: null
        },
        table: {
            type: Number,
            default: null
        },
        chair: {
            type: Number,
            default: null
        },
        bathroom: {
            type: Number,
            default: null
        }
    }
});

const House = mongoose.model("House", houseSchema);
module.exports = House;
