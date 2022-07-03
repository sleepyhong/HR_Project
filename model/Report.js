const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        required: true,
        default: "Open"
    },
    comments: [{
        description: String,
        userId: Schema.Types.ObjectId,
        date: Date
    }]
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;