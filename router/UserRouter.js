const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

router.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error("Incorrect username or password")
        }

        res.json({
            success: true,
            user: user
        });
    }
    catch (error) {
        res.json({
            success: false,
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

module.exports = router;