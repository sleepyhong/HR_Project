const router = require("express").Router();
const bcrypt = require("bcryptjs");
const path = require("path");
const User = require("../model/User");
const House = require("../model/House");
const fs = require("fs");

router.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error("Incorrect username or password")
        }

        res
            .status(200)
            .json({
                user: user
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                msg: error.toString()
            });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    if (password.length < 8) {
        return res
            .status(400)
            .json({ msg: 'Password should be at least 8 characters long' })
    }

    const user = await User.findOne({ username: username }) // finding user in db
    const userEmail = await User.findOne({ email: email }) // finding user in db
    if (user || userEmail)
        return res.status(400).json({ msg: 'User already exists' })

    const newUser = new User({
        username: username,
        email: email,
        password: password
    });

    // hashing the password
    bcrypt.hash(password, Number(process.env.SALT), async (err, hash) => {
        if (err)
            return res.status(400).json({ msg: err })

        newUser.password = hash
        let savedUserRes = await newUser.save()

        const houses = await House.find({});
        for (let house of houses) {
            if (house.residents.length < house.facility.bed) {
                savedUserRes = await User.findByIdAndUpdate(savedUserRes._id, {
                    houseId: house._id
                });

                await House.findByIdAndUpdate(house._id, {
                    residents: [...house.residents, {
                        userId: savedUserRes._id
                    }]
                });

                break;
            }
        }

        if (savedUserRes)
            return res.status(200).json({ msg: 'User is successfully saved' })
    })
});

router.post('/application', async (req, res) => {
    try {
        const inputs = {
            applicationStatus: "Pending",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            preferredName: req.body.preferredName,
            address: {
                building: req.body.building,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            },
            phoneNumber: {
                cell: req.body.cell,
                work: req.body.work
            },
            car: {
                brand: req.body.brand,
                model: req.body.model,
                color: req.body.color
            },
            ssn: req.body.ssn,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            citizenship: req.body.citizenship === "yes",
            visa: {
                type: req.body.visa === "Other" ? req.body.visaTitle : req.body.visa,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                opt: {
                    opt_receipt: {
                        status: "Pending"
                    },
                    opt_ead: {
                        status: "Never_Submitted"
                    },
                    i_983: {
                        status: "Never_Submitted"
                    },
                    i_20: {
                        status: "Never_Submitted"
                    }
                }
            },
            driverLicense: {
                haveLicense: req.body.driverLicense === "yes",
                number: req.body.driverLicenseNumber,
                expirationDate: req.body.expirationDate
            },
            referenceContact: {},
            emergencyContact: []
        }

        if (req.body.referenceFirstName) {
            inputs.referenceContact = {
                firstName: req.body.referenceFirstName,
                lastName: req.body.referenceLastName,
                middleName: req.body.referenceMiddleName,
                phone: req.body.referenceCellPhone,
                email: req.body.referenceEmail,
                relationship: req.body.referenceRelationship
            }
        }

        for (let index = 0; req.body[`emergencyFirstName${index}`]; index++) {
            inputs.emergencyContact.push({
                firstName: req.body[`emergencyFirstName${index}`],
                lastName: req.body[`emergencyLastName${index}`],
                middleName: req.body[`emergencyMiddleName${index}`],
                phone: req.body[`emergencyCellPhone${index}`],
                email: req.body[`emergencyEmail${index}`],
                relationship: req.body[`emergencyRelationship${index}`]
            });
        }

        const updatedUser = await User.findByIdAndUpdate(req.body.userId, inputs, { new: true });

        res
            .status(200)
            .json({
                msg: "Updated Application Information Successfully",
                user: updatedUser
            });
    }
    catch (error) {
        res
            .status(400)
            .json({ msg: error.toString() });
    }
});

router.post('/application/document', async (req, res) => {
    try {
        const profilePicture = req.files.profilePicture;
        const octReceipt = req.files.octReceipt;
        const driverLicenseFile = req.files.driverLicenseFile;
        if (profilePicture) {
            profilePicture.mv(path.resolve(__dirname, `../public/document/profile_pictures/`, `${req.body.userId}.png`));
        }
        if (octReceipt) {
            octReceipt.mv(path.resolve(__dirname, `../public/document/opt/opt_receipt/`, `${req.body.userId}.pdf`));
        }
        if (driverLicenseFile) {
            driverLicenseFile.mv(path.resolve(__dirname, `../public/document/driver_license/`, `${req.body.userId}.pdf`));
        }

        res
            .status(200)
            .json({ msg: "Files Uploaded Successful." })
    }
    catch (error) {
        res
            .status(400)
            .json({ msg: error.toString() });
    }
});

router.post('/information', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        const inputs = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            preferredName: req.body.preferredName,
            email: req.body.email,
            ssn: req.body.ssn,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            address: {
                building: req.body.building,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            },
            phoneNumber: {
                cell: req.body.cell,
                work: req.body.work
            },
            visa: {
                type: req.body.type === "Other" ? req.body.visaTitle : req.body.type,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                opt: {
                    opt_receipt: {
                        status: user.visa.opt.opt_receipt.status
                    },
                    opt_ead: {
                        status: user.visa.opt.opt_ead.status
                    },
                    i_983: {
                        status: user.visa.opt.i_983.status
                    },
                    i_20: {
                        status: user.visa.opt.i_20.status
                    }
                }
            },
            emergencyContact: []
        };
        for (let index = 0; req.body[`emergencyFirstName${index}`]; index++) {
            inputs.emergencyContact.push({
                firstName: req.body[`emergencyFirstName${index}`],
                lastName: req.body[`emergencyLastName${index}`],
                middleName: req.body[`emergencyMiddleName${index}`],
                phone: req.body[`emergencyCellPhone${index}`],
                email: req.body[`emergencyEmail${index}`],
                relationship: req.body[`emergencyRelationship${index}`]
            });
        }

        const updatedUser = await User.findByIdAndUpdate(req.body.userId, inputs, {
            new: true
        });

        res
            .status(200)
            .json({
                msg: "User Personal Information Updated",
                user: updatedUser
            });
    }
    catch (error) {
        res
            .status(400)
            .json({ msg: error.toString() });
    }
});

router.post('/upload-opt-ead', async (req, res) => {
    try {
        const optEAD = req.files.opt_ead;
        const userId = req.body.userId;
        optEAD.mv(path.resolve(__dirname, `../public/document/opt/opt_ead/`, `${userId}.pdf`));

        const user = await User.findById(userId);
        const visa = { ...user.visa };
        visa.opt.opt_ead.status = "Pending";

        const updatedUser = await User.findByIdAndUpdate(userId, {
            visa: visa
        }, {
            new: true
        })

        return res
            .status(200)
            .json({
                msg: "OPT EAD Uploaded Successfully",
                user: updatedUser
            });
    }
    catch (error) {
        return res
            .status(400)
            .json({ msg: error.toString() });
    }
});

router.post('/upload-i-983', async (req, res) => {
    try {
        const i983 = req.files.i_983;
        const userId = req.body.userId;
        i983.mv(path.resolve(__dirname, `../public/document/opt/i_983/`, `${userId}.pdf`));

        const user = await User.findById(userId);
        const visa = { ...user.visa };
        visa.opt.i_983.status = "Pending";

        const updatedUser = await User.findByIdAndUpdate(userId, {
            visa: visa
        }, {
            new: true
        })

        return res
            .status(200)
            .json({
                msg: "I 983 Uploaded Successfully",
                user: updatedUser
            });
    }
    catch (error) {
        return res
            .status(400)
            .json({ msg: error.toString() });
    }
});

router.post('/upload-i-20', async (req, res) => {
    try {
        const i20 = req.files;
        const userId = req.body.userId;
        for (let i = 0; i < Object.keys(i20).length; i++) {
            i20[`i_20_${i}`].mv(path.resolve(__dirname, `../public/document/opt/i_20/`, `${userId}_${i}.pdf`));
        }

        const user = await User.findById(userId);
        const visa = { ...user.visa };
        visa.opt.i_20.status = "Pending";

        const updatedUser = await User.findByIdAndUpdate(userId, {
            visa: visa
        }, {
            new: true
        })

        return res
            .status(200)
            .json({
                msg: "I 20 Uploaded Successfully",
                user: updatedUser
            });
    }
    catch (error) {
        return res
            .status(400)
            .json({ msg: error.toString() });
    }
});

module.exports = router;