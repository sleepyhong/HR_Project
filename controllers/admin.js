const User = require('../model/User');
const House = require('../model/House');
const Report = require('../model/Report');


// todo: HR Admin views users
exports.getUsers = (req, res, next) => {
    User.find({ type: "employee" })
    .then(users => {
        res.json(users)
    })
    .catch(err => {console.log(err)})
};

// todo: HR Admin views houses
exports.getHouses = (req, res, next) => {
    House.find()
    .populate('residents.userId')
    .populate('reports.reportId')
    .then(houses => {
        res.json(houses)
    })
    .catch(err => console.log(err))
};

// todo: HR Admin add new house
exports.postAddHouse = (req, res, next) => {
    const address = req.body.address;
    const landlordFullName = req.body.landlord.fullName;
    const landlordPhoneNumber = req.body.landlord.phoneNumber;
    const landlordEmail = req.body.landlord.email;
    const bed = req.body.facility.bed;
    const mattress = req.body.facility.mattress;
    const table = req.body.facility.table;
    const chair = req.body.facility.chair;
    const bathroom = req.body.facility.bathroom;

    const house = new House ({
        address: address,
        landlord: {
            fullName: landlordFullName,
            phoneNumber: landlordPhoneNumber,
            email: landlordEmail,
        },
        facility: {
            bed: bed,
            mattress: mattress,
            table: table,
            chair: chair,
            bathroom: bathroom
        }
    });

    house
        .save()
        .then(result => {
            console.log('Created new house', result)
            res.json(house)
        })
        .catch(err => {
            console.log(err);
        });
};

// todo: HR Admin delete a house
exports.deleteHouse = (req, res, next) => {
    const houseId = req.params.houseId;
    House.findByIdAndRemove(houseId)
        .then(() => {
            console.log('Destroyed house');
            res.json({});
        })
        .catch(err => console.log(err));
};