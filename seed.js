const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./model/user');
const Report = require('./model/Report');
const House = require('./model/House');
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
        
            username: 'admin',
            email: 'admin@gmail.com',
            password: '$2a$10$mgY50SNM3xW1cnC48syDcOl3Y1CuBTByYbRIlsCrcFc.L0LnGnd8O',
            type: 'hiring_manager',
            firstName: 'Admin',
            lastName: 'HR',
    },
        {
            username: 'test2',
            email: 'test2@gmail.com',
            password: '$2a$10$lbDThRgWtUc4D8V3Kt6HOecwAiUR.bZiH/bd4zxEeuzNjXti38KPC',
            type: 'employee',
            firstName: 'Test',
            lastName: 'Two',
            middleName: '2',
            preferredName: 'tomato',
            ssn: '123-456-7890',
            dateOfBirth: "01/01/2001",
            gender: 'male',
            address: {
                building: 'Garden City',
                street: '112 Main Street',
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
            citizenship: false,
            visa: {
                type: 'Green Card',
                startDate: "01/01/2020",
                endDate: "01/01/2030",
            },
            DriverLicense: {
                haveLicense: true,
                number: '123-456-7890-DRIVE',
                expirationDate: "01/01/2024",
            },
            car: {
                brand: "MAZDA",
                model: "CX-30",
                color: "Navy Blue"
            },
            applicationStatus: "Approved",
            house: {
                houseId: "62bf9a855be8af63e587cc72"
            }
    }
];

const seedReports = [{
    title: "Report 1",
    description: "Report for house 1",
    userId: "62c09723100fe6d65224b5fb",
    date: "01/01/2020",
    status: "Open",
    comments: [
        {
            description: "House is good",
            userId: "62c09723100fe6d65224b5fb",
            date: "01/01/2020",
        }
    ]
}]

const seedHouses = [{
    _id: "62bf9a855be8af63e587cc72",
    address: "123 South Street, New York NY 11550",
    landlord: {
        fullName: 'Jim Hazy',
        phoneNumber: "123-345-7687",
        email: "jim.hazy@gmail.com",
    },
    residents: [
        {
            userId: "62c09723100fe6d65224b5fb",
        },
        {
            userId: "62c09723100fe6d65224b5fc",
        }
    ],
    reports: [
        {
            reportId: "62c0978b9c0a344a69ea134a"
        }
    ],
    facility: {
        bed: 2,
        mattress: 2,
        table: 1,
        chair: 2,
        bathroom: 2
    }
}]

const seedDB = async () => {
    // await User.deleteMany({});
    // await User.insertMany(seedUsers)

    // await Report.deleteMany({});
    // await Report.insertMany(seedReports)

    // await House.deleteMany({});
    // await House.insertMany(seedHouses)
}

seedDB().then(() => {
    mongoose.connection.close();
});