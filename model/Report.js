const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportchema = new Schema({
    title: String,
    description: String,
    userId: {
        _id: Schema.Types.ObjectId,
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