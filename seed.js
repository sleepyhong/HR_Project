const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./model/user');
const MONGO_KEY = process.env.MONGO_KEY;

mongoose
    .connect(MONGO_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => {
        console.log('Seeding ...')
        console.log('MONGO Connection Open!!!')
    })
    .catch(err => {
        console.log(err)
    })

const seedUsers = [
        {
        username: 'test2',
        email: 'test2@gmail.com',
        password: 'test2',
        type: 'employee',
        firstName: 'Test',
        lastName: 'Two',
        middleName: '2',
        preferredName: 'tomato',
        ssn: '123-456-7890',
        dateOfBirth: "01/01/2001",
        gender: 'male',
        address: {
            building: 'Once',
            street: 'Main Street',
            city: 'Jersey City',
            state: 'NJ',
            zip: 07374
        },
        phoneNumber: {
            cell: '123-456-7890',
            work: '123-456-7890'
        },
        employment: {
            title: "Full Stack Developer",
            startDate: "06/23/2022",
            endDate: "06/23/2023"
        },
        referenceContact: {
            firstName: "Liam",
            lastName: "Nguyen",
            middleName: "Huu",
            phone: "929-405-5765",
            email: "liamnguyen.swe@gmail.com",
            relationship: 'Father'
        },
        visa: {
            type: 'Green Card',
            startDate: "01/01/2020",
            endDate: "01/01/2030",
        },
        driverLicense: {
            haveLicense: true,
            number: '123-456-7890-DRIVE',
            expirationDate: "01/01/2024",
        }
    },
    {
        username: 'test3',
        email: 'test3@gmail.com',
        password: 'test3',
        type: 'employee',
        firstName: 'Test',
        lastName: 'Three',
        middleName: '3',
        preferredName: 'banana',
        ssn: '123-456-7890',
        dateOfBirth: "01/01/2001",
        gender: 'male',
        address: {
            building: 'Once',
            street: 'Main Street',
            city: 'Jersey City',
            state: 'NJ',
            zip: 07374
        },
        phoneNumber: {
            cell: '123-456-7890',
            work: '123-456-7890'
        },
        employment: {
            title: "Full Stack Developer",
            startDate: "06/23/2022",
            endDate: "06/23/2023"
        },
        referenceContact: {
            firstName: "Liam",
            lastName: "Nguyen",
            middleName: "Huu",
            phone: "929-405-5765",
            email: "liamnguyen.swe@gmail.com",
            relationship: 'Father'
        },
        visa: {
            type: 'Green Card',
            startDate: "01/01/2020",
            endDate: "01/01/2030",
            document: []
        },
        DriverLicense: {
            number: '123-456-7890-DRIVE',
            expirationDate: "01/01/2024",
            document: []
        }
    },
];

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers)
}

seedDB().then(() => {
    mongoose.connection.close();
});