const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: { 
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['hiring_manager', 'employee'],
        required: true
    },
    firstname: String,
    lastname: String,
    middlename: String,
    preferredName: String,
    ssn: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    address: {
        building: String,
        street: String,
        city: String,
        state: String,
        zip: Number
    },
    phoneNumber: {
        cell: String,
        work: STring
    },
    employement: {
        title: String,
        startDate: Date,
        endDate: Date
    },
    driverLiscense: {
        number: Number,
        expirationDate: Date,
        document: []
    },
    referenceContact: {
        firstname: String,
        lastname: String,
        middlename: String,
        phone: String,
        email: String,
        realtionship: String
    },
    emergencyContact: {
        firstname: String,
        lastname: String,
        middlename: String,
        phone: String,
        email: String,
        realtionship: String
    },
    documents: [{

    }],
    visa: {
        type: String,
        enum: ['Citizen', 'Green Card', 'OPT']
    },
    car: String
    

    // normal / hr
    // personal info
});

// house?

const User = mongoose.model("User", userSchema);
module.exports = User;
