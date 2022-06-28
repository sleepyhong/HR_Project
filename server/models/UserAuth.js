const mongoose = require('mongoose')

const UserAuth = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const UserA = mongoose.model('UserA', UserAuth)

module.exports = UserA