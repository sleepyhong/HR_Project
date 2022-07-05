const User = require('../model/User');
const House = require('../model/House');
const Report = require('../model/Report');
const nodemailer = require("nodemailer");


// todo: HR Admin views users
exports.getUsers = (req, res, next) => {
    User.find({ type: "employee" })
        .then(users => {
            res.json(users)
        })
        .catch(err => { console.log(err) })
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

    const house = new House({
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

// todo: HR update Application Status
exports.updateApplicationStatus = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((application) => {
        if (!application) {
            return res.status(404).send()
        }
        res.send(application)
    })
        .catch(err => {
            res.status(500).send(err)
        })
}

exports.updateOPTReceiptStatus = (req, res, next) => {

    const { status, message } = req.body;
    const userId = req.params.id;

    User.findByIdAndUpdate(userId,
        {
            $set: {
                'visa.opt.opt_receipt.status': status,
                'visa.opt.opt_receipt.message': message
            }
        }, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res
                    .status(200)
                    .json({ result: result, message: "Updated" });
                // .send(result)
            }
        })
}

exports.updateOPTEADStatus = (req, res, next) => {

    const { status, message } = req.body;
    const userId = req.params.id;

    User.findByIdAndUpdate(userId,
        {
            $set: {
                'visa.opt.opt_ead.status': status,
                'visa.opt.opt_ead.message': message
            }
        }, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res
                    .status(200)
                    .json({ result: result, message: "Updated" });
                // .send(result)
            }
        })
}

exports.updateI983Status = (req, res, next) => {

    const { status, message } = req.body;
    const userId = req.params.id;

    User.findByIdAndUpdate(userId,
        {
            $set: {
                'visa.opt.i_983.status': status,
                'visa.opt.i_983.message': message
            }
        }, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res
                    .status(200)
                    .json({ result: result, message: "Updated" });
                // .send(result)
            }
        })
}

exports.updateI20Status = (req, res, next) => {

    const { status, message } = req.body;
    const userId = req.params.id;

    User.findByIdAndUpdate(userId,
        {
            $set: {
                'visa.opt.i_20.status': status,
                'visa.opt.i_20.message': message
            }
        }, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res
                    .status(200)
                    .json({ result: result, message: "Updated" });
                // .send(result)
            }
        })
}

//todo: HR send visa status management action to 
exports.sendUploadDocumentsEmail = (req, res, next) => {
    try {
        const { userEmail, status, message } = req.body;
        const transporter = nodemailer.createTransport({
            host: 'smtp.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        transporter.sendMail({
            from: `"HR Project" <${process.env.EMAIL}>`,
            to: userEmail,
            subject: `Visa Application Status ${status}`,
            text: `This is HR from BeaCon Fire. ${message}`
        }, (error) => {
            if (error) {
                res.send(500)
            } else {
                res.send(200)
            }
        })
    }
    catch (error) {
        res.status(400).json(error.toString());
    }
}