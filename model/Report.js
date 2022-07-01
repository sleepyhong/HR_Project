const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    title: String,
    description: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: Date,
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed']
    }
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;