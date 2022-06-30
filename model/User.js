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
        default: "employee",
        required: true
    },
    firstName: String,
    lastName: String,
    middleName: String,
    preferredName: String,
    address: {
        building: String,
        street: String,
        city: String,
        state: String,
        zip: Number
    },
    phoneNumber: {
        cell: String,
        work: String
    },
    car: {
        brand: String,
        model: String,
        color: String
    },
    ssn: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'I do not wish to answer']
    },
    visa: {
        type: String,
        enum: ['Citizen', 'Green_Card', 'H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other']
    },
    employment: {
        title: String,
        startDate: Date,
        endDate: Date
    },
    driverLicense: {
        number: Number,
        expirationDate: Date
    },
    referenceContact: {
        firstName: String,
        lastName: String,
        middleName: String,
        phone: String,
        email: String,
        relationship: String
    },
    emergencyContact: {
        firstName: String,
        lastName: String,
        middleName: String,
        phone: String,
        email: String,
        relationship: String
    },
    isDrivingCar: Boolean,
    applicationStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Never_Submitted'],
        default: 'Never_Submitted'
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
