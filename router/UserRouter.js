const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const Token = require("../model/RegisterToken");

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
                error: error.toString()
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
    })

    // hashing the password
    bcrypt.hash(password, Number(process.env.SALT), async (err, hash) => {
        if (err)
            return res.status(400).json({ msg: err })

        newUser.password = hash
        const savedUserRes = await newUser.save()

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
            visa: req.body.visa,
            employment: {
                startDate: req.body.startDate,
                endDate: req.body.endDate
            },
            driverLicense: {
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
                firstName: req.body.emergencyFirstName,
                lastName: req.body.emergencyLastName,
                middleName: req.body.emergencyMiddleName,
                phone: req.body.emergencyCellPhone,
                email: req.body.emergencyEmail,
                relationship: req.body.emergencyRelationship
            });
        }
        
        const user = await User.findByIdAndUpdate(req.body.userId, inputs);

        res
            .status(200)
            .json({
                msg: "Updated Application Information Successfully",
                user: user
            });
    }
    catch (error) {
        res
            .status(400)
            .json({ msg: error.toString() });
    }
});

router.post('/information', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, req.body);

        res
            .status(200)
            .json({
                msg: "User Personal Information Updated"
            });
    }
    catch (error) {
        res
            .status(400)
            .json({ msg: error.toString() });
    }
});

module.exports = router;