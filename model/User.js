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
    firstName: String,
    lastName: String,
    middleName: String,
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
        work: String
    },
    employment: {
        title: String,
        startDate: Date,
        endDate: Date
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
    visa: {
        type: {
            type: String,
            enum: ['Citizen', 'Green Card', 'H1-B','L2','F1(CPT/OPT)', 'H4', 'Other'],
        },
        startDate: Date,
        endDate: Date,
        document: []
    },
    DriverLicense: {
        number: String,
        expirationDate: Date,
        document: []
    }

    
});

module.exports  = mongoose.model("User", userSchema);

