const User = require('../model/User');
const House = require('../model/House');

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
    .then(houses => {
        res.json(houses)
    })
    .catch(err => console.log(err))
};

// todo: HR Admin add new house
exports.postAddHouse = (req, res, next) => {
    const address = req.body.address;
    const landlordFullName = req.body.landlordFullName;
    const landlordPhoneNumber = req.body.landlordPhoneNumber;
    const landlordEmail = req.body.landlordEmail;
    const bed = req.body.bed;
    const mattress = req.body.mattress;
    const table = req.body.table;
    const chair = req.body.chair;
    const bathroom = req.body.bathroom;

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